import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";

export const CreateCategories = async (req, res) => {
  try {
    const { name, desc } = req.body;
    // kiểm tra dữ liệu rỗng
    if (!name)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống thông tin." });

    // kiểm ký tự đặc biệt
    const nameRegex = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (nameRegex.test(name))
      return res
        .status(400)
        .json({ message: "Tên danh mục không được chứa ký tự đặc biệt!" });

    // kiểm tra tồn tại của danh mục
    const existCategory = await categoryModel.findOne({ name });
    if (existCategory)
      return res.status(400).json({ message: "Danh mục đã tồn tại." });

    await categoryModel.create({
      name,
      desc,
    });

    return res.status(200).json({ message: "Thêm danh mục mới thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const UpdateItemCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc } = req.body;
    // kiểm tra dữ liệu rỗng
    if (!name)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống thông tin." });

    // kiểm ký tự đặc biệt
    const nameRegex = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (nameRegex.test(name))
      return res
        .status(400)
        .json({ message: "Tên danh mục không được chứa ký tự đặc biệt!" });

    // cập nhật lại dữ liệu
    await categoryModel.findByIdAndUpdate(
      { _id: id },
      { $set: { name, desc } }
    );

    return res.status(200).json({ message: "Bạn đã danh mục thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const DeleteItemCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await productModel.findOne({ categories_id: id });
    if (category) return res.status(400).json({ message: "Không thể xóa danh mục vì đang có sản phẩm sử dụng." });
    await categoryModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa danh mục thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const GetItemCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryModel.findById(
      { _id: id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    if (!result) return res.status(400).json({ message: "" });

    return res.status(200).json({ category: result });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const GetAllCategories = async (req, res) => {
  try {
    const result = await categoryModel.find().select("name desc");

    return res.status(200).json({ categories: result });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
