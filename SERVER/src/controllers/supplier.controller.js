import supplierModel from "../models/supplier.model.js";
import productModel from "../models/product.model.js";

export const CreateSupplier = async (req, res) => {
  try {
    const file = req.file;
    const { name, email, phone, address } = req.body;
    console.log(req.body)

    // kiểm tra dữ liệu rỗng
    if (!name || !email || !phone || !address)
      return res
        .status(400)
        .json({ message: "Vui lòng điền thông tin các trường." });

    // kiểm ký tự đặc biệt
    const nameRegex = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (nameRegex.test(name))
      return res
        .status(400)
        .json({ message: "Tên nhà cung cấp không được chứa ký tự đặc biệt!" });

    // kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Email không hợp lệ!" });

    // kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Số điện thoại không hợp lệ!" });

    if (file) {
      // Kiểm tra định dạng file ảnh
      const imgRegex = /image\/(jpeg|jpg|png|gif)/;
      if (!imgRegex.test(file.mimetype))
        return res.status(400).json({
          message: "Chỉ cho phép upload hình ảnh (.jpg, .jpeg, .png, .gif).",
        });
      const filesize = 5 * 1024 * 1024;
      if (file.size > filesize)
        return res.status(400).json({ message: "Ảnh quá lớn! Tối đa 5MB." });
      // thêm nhà cung cấp mới
      await supplierModel.create({
        name,
        email,
        phone,
        address,
        imgUrl: file.filename,
      });
      return res
        .status(200)
        .json({ message: "Thêm nhà cung cấp mới thành công." });
    }

    // thêm nhà cung cấp mới
    await supplierModel.create({
      name,
      email,
      phone,
      address,
    });

    return res
      .status(200)
      .json({ message: "Thêm nhà cung cấp mới thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const GetItemSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await supplierModel.findById(
      { _id: id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!result)
      return res.status(400).json({ message: "Nhà cung cấp không tồn tại." });

    return res.status(200).json({ suppliers: result });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateItemSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const { name, email, phone, address } = req.body;
    // kiểm tra dữ liệu rỗng
    if (!name || !email || !phone || !address)
      return res
        .status(400)
        .json({ message: "Vui lòng điền thông tin các trường." });

    // kiểm ký tự đặc biệt
    const nameRegex = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (nameRegex.test(name))
      return res
        .status(400)
        .json({ message: "Tên nhà cung cấp không được chứa ký tự đặc biệt!" });

    // kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ mess: "Email không hợp lệ!" });

    // kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ mess: "Số điện thoại không hợp lệ!" });

    const data = { name, email, phone, address };

    if (file) {
      // Kiểm tra định dạng file ảnh
      const imgRegex = /image\/(jpeg|jpg|png|gif)/;
      if (!imgRegex.test(file.mimetype))
        return res.status(400).json({
          message: "Chỉ cho phép upload hình ảnh (.jpg, .jpeg, .png, .gif).",
        });

      const filesize = 5 * 1024 * 1024;
      if (file.size > filesize)
        return res.status(400).json({ message: "Ảnh quá lớn! Tối đa 5MB." });

      data.imgUrl = file.filename;
    }

    await supplierModel.findByIdAndUpdate({ _id: id }, { $set: data });

    return res
      .status(200)
      .json({ message: "Chỉnh sửa thông tin nhà cung cấp thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const deleteItemSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await productModel.findOne({ supplier_id: id });
    if (supplier) return res.status(400).json({ message: "Không thể xóa danh mục vì đang có sản phẩm sử dụng." });
    await supplierModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa nhà cung cấp thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const GetAllSuppliers = async (req, res) => {
  try {
    const result = await supplierModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    return res.status(200).json({ suppliers: result });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
