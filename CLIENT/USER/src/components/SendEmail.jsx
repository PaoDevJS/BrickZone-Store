import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const SendEmail = ({ setPage, setEmail }) => {
  const [change, setChange] = useState("");
  const linkUrlApiSendEmail = "http://localhost:3000/api/v1/user/send-email";

  const isSendEmail = async () => {
    try {
      const result = await axios.post(linkUrlApiSendEmail, { email: change });
      setEmail(change);
      setPage(result.data?.page);
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
  const handleSendEmail = (e) => {
    e.preventDefault();
    isSendEmail();
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-between">
      <div className="w-[30%] py-10 px-15 border border-gray-100 rounded-md shadow-lg shadow-Gray/30 m-auto">
        <div className="text-center">
          <h3 className="text-2xl font-[500]">Quên mật khẩu?</h3>
          <p className="text-gray-700 mt-2">
            Điển email gắn với tài khoản của bạn để nhận mã xác nhận lấy lại mật
            khẩu.
          </p>
        </div>
        <form className="mt-10">
          <div>
            <h4 className="text-[16px] text-gray-600 mb-2">Email:</h4>
            <input
              type="email"
              placeholder="Nhập email tại đây..."
              value={change}
              onChange={(e) => setChange(e.target.value)}
              className="border border-gray-200 w-full outline-none rounded py-2 px-4 placeholder:font-[500]"
            />
          </div>
          <div className="flex items-center flex-col gap-5 mt-7">
            <button
              onClick={handleSendEmail}
              className="bg-Primary py-2 text-[16px] rounded-md font-[500] text-white w-[70%] cursor-pointer hover:scale-95 transition-all duration-150 ease-in"
            >
              Gửi
            </button>
            <Link to={"/dang-nhap"} className="text-Primary font-[500]">
              Quay lại trang đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
