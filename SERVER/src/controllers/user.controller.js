import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import sendNodemailer from "../utils/nodemailer.js";

export const GetItemUser = async (req, res) => {
  try {
    const user = await userModel.findById(
      { _id: req.id },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút." });
  }
};

export const isChangePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmPassword } = req.body;
    const user = await userModel.findById(req.id);

    if (!password || !newPassword || !confirmPassword)
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại." });

    const comparePassword = await bcrypt.compareSync(password, user.password);

    if (!comparePassword)
      return res.status(400).json({ message: "Mật khẩu cũ không đúng." });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Xác nhận mật khẩu không khớp." });

    if (newPassword.length < 8)
      return res
        .status(400)
        .json({ message: "Mật khẩu mới phải có ít nhất 8 ký tự." });

    const hashPassword = await bcrypt.hashSync(newPassword, 10);

    user.password = hashPassword || user.password;
    await user.save();

    return res.status(200).json({ message: "Thay đổi mật khẩu thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút." });
  }
};

export const isCheckEmailOfUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Vui lòng nhập email." });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Email không hợp lệ." });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Người dùng không tồn tại." });

    const OTP = Math.floor(1000000 * Math.random() * 900000).toString();

    const subject = `Mã Xác Thực OTP Của Bạn`;
    const html = `
      <p>
        Xin chào ${user.firstName + user.lastName}, <br>
            
        Bạn vừa yêu cầu mã xác thực (OTP) để đăng nhập hoặc xác minh tài khoản tại BRICKZONE STORE. <br>
    
        🔐 Mã OTP của bạn: ${OTP} <br>
    
        ⚠ Lưu ý: <br>
    
        Mã này có hiệu lực trong 3 phút. <br>
        Không chia sẻ mã này với bất kỳ ai, kể cả nhân viên CHỐT STORE. <br>
        Nếu bạn không yêu cầu mã này, hãy bỏ qua email này hoặc liên hệ với chúng tôi ngay. <br>
        📞 Hỗ trợ: hahuybinh2305@gmail.com | 0969028560 <br>
    
        Cảm ơn bạn đã sử dụng sản phẩm tại BRICKZONE STORE! 🚀 <br>
    
        Trân trọng.
      </p>
    `;

    // Gửi mã OTP qua email
    sendNodemailer({ gmail: user.email, subject, html });
    const hashOtp = await bcrypt.hashSync(OTP, 10);
    user.otp = hashOtp;
    user.otpExpireAt = Date.now + 3 * 60 * 1000;
    await user.save();

    return res.status(200).json({ page: 2 });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút.",
    });
  }
};

export const isCheckOtpOfUser = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp)
      return res.status(400).json({ message: "Vui lòng nhập mã xác thực." });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại hoặc đã bị xoá." });
    }

    if (Date.now() > user.otpExpireAt)
      return res.status(400).json({
        message: "Mã xác thực đã hết hạn. Vui lòng yêu cầu lại mã mới.",
      });

    const compareOtp = await bcrypt.compareSync(otp, user.otp);
    if (!compareOtp)
      return res.status(400).json({
        message: "Mã xác thực không đúng. Vui lòng thử lại.",
      });

    user.otp = null;
    user.otpExpireAt = null;
    await user.save();

    return res
      .status(200)
      .json({ page: 3, message: "Xác thực mã OTP thành công." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút." });
  }
};

export const isRestPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!newPassword || !confirmPassword)
      return res
        .status(404)
        .json({ message: "Vui lòng nhập đầy đủ mật khẩu mới." });

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
    }

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 8 ký tự." });
    }

    const hashPassword = await bcrypt.hashSync(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút." });
  }
};
