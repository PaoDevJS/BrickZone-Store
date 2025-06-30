import cartModel from "../models/cart.model.js";

export const addProductItemOnCart = async (req, res) => {
  try {
    const { quantity, product_id } = req.body;
    const cart = await cartModel.findOne({ user_id: req.id });
    if (!cart) {
      await cartModel.create({
        user_id: req.id,
        products: [{ product_id, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product_id.toString() === product_id.toString()
      );

      if (productIndex > -1) {
        // cập nhật số lượng
        cart.products[productIndex].quantity += quantity;
      } else {
        // thêm mới sản phẩm
        cart.products.push({ product_id, quantity });
      }

      await cart.save();
    }

    return res
      .status(200)
      .json({ message: "Sản phẩm đã được thêm vào giỏ hàng." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllProductsInCart = async (req, res) => {
  try {
    const carts = await cartModel
      .findOne({ user_id: req.id }, { updatedAt: 0, createdAt: 0, __v: 0 })
      .populate("products.product_id");

    return res.status(200).json(carts);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const deleteProductItemToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartModel.findOne({ user_id: req.id });
    const productIndex = await cart.products.findIndex(
      (p) => p.product_id.toString() === id.toString()
    );

    await cart.products.splice(productIndex, 1);
    await cart.save();

    return res
      .status(200)
      .json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateProductItemToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { method } = req.body;

    const cart = await cartModel.findOne(
      { user_id: req.id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    const productIndex = await cart.products.findIndex(
      (p) => p._id.toString() === id.toString()
    );

    if (method === "minus") {
      cart.products[productIndex].quantity -= 1;
    } else if (method === "plus") {
      cart.products[productIndex].quantity += 1;
    }

    await cart.save();

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
