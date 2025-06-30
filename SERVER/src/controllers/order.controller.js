import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";
import { IsPaymentMoMo } from "../services/payment_momo.js";
import addressModel from "../models/address.model.js";
import cartModel from "../models/cart.model.js";

export const createOrderPayment = async (req, res) => {
  try {
    const { totalAmount, paymentMethod, infoUser, products, cart_id } =
      req.body;

    if (!infoUser)
      return res
        .status(400)
        .json({ message: "Vui lòng chọn địa chỉ nhận hàng." });

    if (!paymentMethod)
      return res
        .status(400)
        .json({ message: "Vui lòng chọn phương thức thanh toán." });

    for (const item of products) {
      const product = await productModel.findById(item.product_id);
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm ${product.name} không đủ số lượng trong kho.`,
        });
      }
    }
    const order = await orderModel.create({
      user_id: req.id,
      totalAmount,
      paymentMethod,
      infoUser,
      listProducts: products,
      orderTimer: new Date().toLocaleDateString(),
    });

    const order_id = order.id;
    if (paymentMethod === "MOMO") {
      await orderModel.findByIdAndUpdate(order_id, { paymentStatus: "Chờ thanh toán" })
      const result = await IsPaymentMoMo(res, totalAmount, order_id, cart_id);
      return res.status(200).json({
        payUrl: result.payUrl,
        paymentMethod,
      });
    }

    if (paymentMethod === "COD") {
      await cartModel.findByIdAndDelete(cart_id);
      return res.status(200).json({
        message: "Đặt hàng thành công.",
        order_id: order_id,
        paymentMethod,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(200)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const listOrders = await orderModel.find({}).populate([
      { path: "user_id", select: "email firstName lastName" },
      { path: "listProducts.product_id", select: "name imgUrl price" },
    ]);

    const ordersWithAddress = await Promise.all(
      listOrders.map(async (order) => {
        const addressDoc = await addressModel.findOne({
          user_id: order.user_id._id,
        });
        const matchedAddress = addressDoc?.listAddress.find(
          (addr) => addr._id.toString() === order.infoUser.toString()
        );
        return {
          ...order.toObject(),
          address: matchedAddress,
        };
      })
    );

    return res.status(200).json(ordersWithAddress);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllOrdersOfUser = async (req, res) => {
  try {
    const listOrders = await orderModel
      .find({ user_id: req.id }, { infoUser: 0 })
      .populate([
        { path: "user_id", select: "email firstName lastName" },
        { path: "listProducts.product_id", select: "name imgUrl price" },
      ]);

    return res.status(200).json(listOrders);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getItemOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id).populate([
      { path: "user_id", select: "email firstName lastName" },
      { path: "listProducts.product_id", select: "name imgUrl price" },
    ]);

    const addressDoc = await addressModel.findOne({
      user_id: order.user_id._id,
    });
    const matchedAddress = addressDoc?.listAddress.find(
      (addr) => addr._id.toString() === order.infoUser.toString()
    );

    return res.status(200).json({
      ...order.toObject(),
      address: matchedAddress,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateItemOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(id);
    if (!order)
      return res.status(400).json({ message: "Đơn hàng không tồn tại." });

    if (status === "Giao thành công") order.paymentStatus = "Đã thanh toán";

    order.status = status || order.status;
    await order.save();

    return res.status(200).json({ message: "Cập nhật đơn hàng thành công" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
