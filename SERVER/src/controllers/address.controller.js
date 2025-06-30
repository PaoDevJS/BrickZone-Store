import addressModel from "../models/address.model.js";

export const createAddress = async (req, res) => {
  try {
    const { fullname, phone, address } = req.body;
    if (!fullname || !phone || !address)
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });

    // kiểm ký tự đặc biệt
    const re = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (re.test(fullname))
      return res
        .status(400)
        .json({ message: "Họ tên không được chứa ký tự đặc biệt." });

    // kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Số điện thoại không hợp lệ!" });

    const user = await addressModel.findOne({ user_id: req.id });

    if (!user) {
      await addressModel.create({
        user_id: req.id,
        listAddress: [{ fullname, phone, address }],
      });
    } else {
      user.listAddress.push({ fullname, phone, address });
      await user.save()
    }

    return res.status(200).json({ message: "Thêm địa chỉ mới thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, phone, address } = req.body;
    if (!fullname || !phone || !address)
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });

    const user = await addressModel.findOne({ user_id: req.id });

    // kiểm ký tự đặc biệt
    const re = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/;
    if (re.test(fullname))
      return res
        .status(400)
        .json({ message: "Họ tên không được chứa ký tự đặc biệt." });

    // kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone))
      return res.status(400).json({ message: "Số điện thoại không hợp lệ!" });

    const addressIndex = user.listAddress.findIndex(
      (p) => p._id.toString() === id.toString()
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Địa chỉ không tồn tại." });
    }

    // Cập nhật địa chỉ trong mảng
    user.listAddress[addressIndex].fullname = fullname;
    user.listAddress[addressIndex].phone = phone;
    user.listAddress[addressIndex].address = address;

    await user.save();

    return res.status(200).json({ message: "Cập nhật địa chỉ thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await addressModel.findOne({ user_id: req.id });
    if (!address) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    // Lọc bỏ địa chỉ cần xoá
    address.listAddress = address.listAddress.filter(
      (addr) => addr._id.toString() !== id.toString()
    );

    // Lưu lại thay đổi
    await address.save();

    return res.status(200).json({ message: "Xóa địa chỉ thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getItemAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await addressModel.findOne({ user_id: req.id });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    const address = user.listAddress.filter(
      (addr) => addr._id.toString() === id.toString()
    );
    if (!address)
      return res.status(404).json({ message: "Địa chỉ không tồn tại." });

    return res.status(200).json(address);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getAllAddress = async (req, res) => {
  try {
    const listAddress = await addressModel
      .findOne({ user_id: req.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
      .populate("user_id");

    return res.status(200).json(listAddress)
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
