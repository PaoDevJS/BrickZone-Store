import axios from "axios";
import crypto from "crypto";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";

export const IsPaymentMoMo = async (res, totalAmount, order_id, cart_id) => {
  const accessKey = process.env.accessKey_momo;
  const secretKey = process.env.secretKey_momo;
  const partnerCode = "MOMO";
  const redirectUrl = `http://localhost:5173`;
  const ipnUrl = `https://d93d-1-53-37-58.ngrok-free.app/api/v1/order/payment/check-type-payment/${cart_id}`;
  const requestType = "payWithMethod";
  var amount = totalAmount;
  var orderId = order_id;
  const orderInfo = `Thanh toán đơn hàng #${order_id}`;
  const requestId = order_id;
  const extraData = "";
  const orderGroupId = "";
  const autoCapture = true;
  const lang = "vi";

  //before sign HMAC SHA256 with format
  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang: lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupI: orderGroupId,
    signature,
  });

  try {
    const result = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Server error",
    });
  }
};

export const checkTypePaymentMoMo = async (req, res) => {
  const { id } = req.params;
  const { resultCode, orderId } = req.body;

  const order = await orderModel.findById(orderId);

  if (resultCode === 0) {
    // Cập nhật số lượng sản phẩm
    await Promise.all(
      order.listProducts.map(async (item) => {
        const product = await productModel.findById(item.product_id);
        if (product) {
          product.stock -= item.quantity;
          await product.save();
        }
      })
    );
    // xóa các sản phẩm trong giỏ hàng
    await cartModel.findByIdAndDelete(id);
    // cập nhật trạng thái thanh toán
    order.paymentStatus = "Đã thanh toán";
    order.save();
  } else {
    // cập nhật trạng thái thanh toán
    order.paymentStatus = "Thanh toán thất bại";
    order.status = "Đã hủy"
    order.save();
  }
};
