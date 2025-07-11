import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import supplierModel from "../models/supplier.model.js";

export const newCreateProduct = async (req, res) => {
  try {
    const files = req.files;
    const {
      name,
      stock,
      desc,
      price,
      categories_id,
      supplier_id,
      code_product,
      voucher,
      outstand
    } = req.body;

    const re = /[!@#$%^&*()?":{}|<>_\-+=~`[\]\\\/]/;
    const reNumber = /^[0-9]+$/;

    // kiểm tra dữ liệu
    if (
      !name ||
      !stock ||
      !desc ||
      !price ||
      !categories_id ||
      !supplier_id ||
      !code_product
    )
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các trường thông tin." });
    // kiểm tra ký tự đặc biệt
    if (re.test(name))
      return res
        .status(400)
        .json({ message: "Tên sản phầm không được chứa ký tự đặc biệt." });

    // kiểm tra sản phẩm tồn tại
    const existProduct = await productModel.findOne({
      $or: [{ name }, { code_product }],
    });
    if (existProduct)
      return res.status(400).json({ message: "Sản phầm đã tồn tại." });

    // kiểm tra giá tiền
    if (!reNumber.test(price) || price <= 0)
      return res
        .status(400)
        .json({ message: "Giá tiền của sản phẩm không hợp lệ." });

    if (!reNumber.test(stock) || price <= 0)
      return res
        .status(400)
        .json({ message: "Số lượng sản phẩm không hợp lệ." });

    // xử lý ảnh
    const arrayImgUrl = [];
    const imgRegex = /image\/(jpeg|jpg|png|gif|webp)/;
    const fileSize = 5 * 1024 * 1024;

    if (!files) return res.status(400).json({ message: "Vui lòng chọn ảnh." });
    files.forEach((item) => {
      if (!imgRegex.test(item.mimetype))
        return res.status(400).json({
          message: "Chỉ cho phép upload hình ảnh (.jpg, .jpeg, .png, .gif).",
        });

      if (item.size > fileSize)
        return res.status(400).json({ message: "Ảnh quá lớn! Tối đa 5MB." });

      arrayImgUrl.push(item.filename);
    });

    const categoriesId = await categoryModel.findOne({ name: categories_id });
    const supplierId = await supplierModel.findOne({ name: supplier_id });

    await productModel.create({
      name,
      code_product,
      categories_id: categoriesId,
      supplier_id: supplierId,
      stock,
      desc,
      price,
      imgUrl: arrayImgUrl,
      voucher,
      outstand
    });

    return res.status(200).json({ message: "Thêm sản phẩm mới thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateItemProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const {
      name,
      stock,
      desc,
      price,
      categories_id,
      supplier_id,
      code_product,
      status,
      imgUrls,
      voucher, 
      outstand
    } = req.body;
    // Kiểm tra sản phẩm có tồn tại
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }
    // Kiểm tra trùng mã sản phẩm (nếu thay đổi)
    const existProduct = await productModel.findOne({
      _id: { $ne: id },
      $or: [{ name }, { code_product }],
    });
    if (existProduct) {
      return res
        .status(400)
        .json({ message: "Tên hoặc mã sản phẩm đã tồn tại." });
    }
    const images = Array.isArray(imgUrls) ? [...imgUrls] : [];
    // //  Nếu có ảnh mới
    if (files && files.length > 0) {
      files.map((item) => images.push(item.filename));
    }

    // Cập nhật thông tin
    product.name = name || product.name;
    product.desc = desc || product.desc;
    product.price = price || product.price;
    product.code_product = code_product || product.code_product;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.status = status || product.status;
    product.categories_id = categories_id || product.categories_id;
    product.supplier_id = supplier_id || product.supplier_id;
    product.imgUrl = images || product.imgUrl;
    product.outstand = outstand || product.outstand
    product.voucher = voucher || product.voucher

    await product.save();

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công.",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const deleteItemProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Xóa sản phẩm thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getItemProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById({ _id: id }, { createdAt: 0, updatedAt: 0, __v: 0 })
      .populate("categories_id supplier_id");
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    ).populate({ path: "categories_id", select: "name id"});
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
