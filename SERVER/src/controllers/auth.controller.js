import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendNodemailer from "../utils/nodemailer.js";

export const SignUp = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword } =
      req.body;

    // kiểm tra dữ liệu trống
    if (!firstName || !lastName || !username || !email || !password)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các trường thông tin." });

    // kiểm tra tồn tại tên đăng nhập
    const existUsername = await userModel.findOne({ username });
    if (existUsername)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });

    // kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Email không hợp lệ!" });

    // kiểm tra tồn tại email
    const existEmail = await userModel.findOne({ email });
    if (existEmail)
      return res.status(400).json({ message: "Email đã tồn tại!" });

    // kiểm tra độ dài mật khẩu
    if (password.length < 8 || password.length > 16)
      return res
        .status(400)
        .json({ message: "Độ dài mật khẩu thiểu 8 ký tự và tối đa 16 ký tự" });

    if (confirmPassword) {
      if (password !== confirmPassword)
        return res.status(400).json({ message: "Mật khẩu không trùng khớp." });
    }

    // mã hóa mật khẩu
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const user = await userModel.create({
      lastName,
      firstName,
      username,
      email,
      password: hashPassword
    });

    const subject = `LEGOWORLD STORE - Chào Mừng Bạn! Đăng Ký Thành Công 🎉`;
    const html = `
        <p>
          Xin chào <strong>${
            user.firstName + " " + user.lastName
          }</strong>,<br><br>

          🎉 <strong>Chúc mừng!</strong> Bạn đã đăng ký thành công tài khoản tại <strong>CHỐT STORE</strong>.<br><br>

          <strong>Thông tin tài khoản:</strong><br>
          - Tên đăng nhập: ${user.firstName + " " + user.lastName}<br>
          - Ngày đăng ký: ${new Date().toLocaleDateString("vi-VN")}<br><br>

          👉 Hãy đăng nhập và khám phá ngay: 
          <a href="http://localhost:5173/customer/account/login">Tại đây</a><br><br>

          Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi:<br>
          📧 Email: hahuybinh2305@gmail.com<br>
          📞 SĐT: 0969028560<br><br>

          Cảm ơn bạn đã tin tưởng và sử dụng sản phẩm tại <strong>BRICKZONE STORE</strong>!<br><br>

          Trân trọng,<br>
          <em>BRICKZONE STORE Team</em>
        </p>
    `;

    sendNodemailer({ gmail: user.email, subject, html });

    return res.status(200).json({ message: "Đăng ký tài khoản thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // kiểm tra dữ liệu rỗng
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các thông tin." });

    // kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Email không hợp lệ." });

    // kiểm tra email
    const user = await userModel.findOne(
      { email },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!user)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });

    // kiểm tra mật khẩu
    const comparePassword = await bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });

    // kiểm tra trạng thái hoạt động
    if (user.status === "Khóa")
      return res.status(400).json({
        message:
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với hotline để được hỗ trợ.",
      });

    const token = await jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Đăng nhập tài khoản thành công.",
      token,
      auth: {
        id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        imgUrl: user.avatar
      },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const getItemAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(
      { _id: id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const updateItemAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, phone, password, firstName, lastName, status } = req.body;

    const user = await userModel.findById(id);
    if (!user)
      return res.status(200).json({ message: "Người dùng không tồn tại." });

    // kiểm tra dữ liệu trống
    if (!firstName || !lastName || !email || !password || !status)
      return res
        .status(400)
        .json({ message: "Vui lòng không để trống các trường thông tin." });

    // kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Email không hợp lệ!" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.status = status || user.status;
    if (user.password !== password) {
      // kiểm tra độ dài mật khẩu
      if (password.length < 8 || password.length > 16)
        return res
          .status(400)
          .json({
            message: "Độ dài mật khẩu thiểu 8 ký tự và tối đa 16 ký tự",
          });
      // mã hóa mật khẩu
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      user.password = hashPassword || user.password;
    }

    await user.save();
    return res.status(200).json({ message: "Cập nhật thông tin thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};
