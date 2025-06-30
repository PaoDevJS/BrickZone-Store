import blogModel from "../models/blog.model.js";

export const newCreateBlog = async (req, res) => {
  try {
    const { title, desc, content } = req.body;
    const file = req.file;

    // kiểm tra dữ liệu rỗng
    if (!title || !desc || !content)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các trường thông tin." });

    if (!file) return res.status(400).json({ message: "Vui lòng chọn ảnh." });

    const imgRegex = /image\/(jpeg|jpg|png|gif)/;
    if (!imgRegex.test(file.mimetype))
      return res.status(400).json({
        message: "Chỉ cho phép upload hình ảnh (.jpg, .jpeg, .png, .gif).",
      });

    const filesize = 5 * 1024 * 1024;
    if (file.size > filesize)
      return res.status(400).json({ message: "Ảnh quá lớn! Tối đa 5MB." });

    await blogModel.create({
      title,
      desc,
      content,
      imgUrl: file.filename,
    });

    return res.status(200).json({ message: "Thêm tin tức mới thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateItemBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, content } = req.body;
    const file = req.file;

    // kiểm tra dữ liệu rỗng
    if (!title || !desc || !content)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các trường thông tin." });

    const data = { title, desc, content };

    if (file) {
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

    await blogModel.findByIdAndUpdate({ _id: id }, { $set: data });

    return res.status(200).json({ message: "Cập nhật tin tức thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const deleteItemBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blogModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa tin tức thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getItemBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(
      { _id: id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
