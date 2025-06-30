import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RestPassword = ({ email }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    email,
  });
  const navigate = useNavigate();
  const linkUrlApiRestPassword =
    "http://localhost:3000/api/v1/user/rest-password";

  const onChangeFormData = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleRestPassword = async () => {
    try {
      const result = await axios.post(linkUrlApiRestPassword, formData);
      toast.success(result.data?.message);
      navigate("/dang-nhap");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-between">
      <div className="w-[30%] py-10 px-15 border border-gray-100 rounded-md shadow-lg shadow-Gray/30 m-auto flex flex-col gap-10">
        <div className="text-center">
          <h3 className="text-2xl font-[500]">Đặt lại mật khẩu</h3>
          <p className="text-gray-700 mt-2">
            Nhập mật khẩu mới cho tài khoản của bạn.
          </p>
        </div>
        <div>
          <div>
            <h3>Mật khẩu mới:</h3>
            <input
              type="password"
              name="newPassword"
              onChange={onChangeFormData}
              placeholder="Nhập mật khẩu mới tại đây..."
              className="w-full p-3 rounded border border-gray-200 outline-none placeholder:font-[500]"
            />
          </div>
          <div>
            <h3>Nhập lại mật khẩu:</h3>
            <input
              type="password"
              name="confirmPassword"
              onChange={onChangeFormData}
              placeholder="Nhập lại mật khẩu tại đây..."
              className="w-full p-3 rounded border border-gray-200 outline-none placeholder:font-[500]"
            />
          </div>
          <button
            onClick={handleRestPassword}
            className="bg-Primary w-[70%] m-auto block rounded py-2 cursor-pointer text-[16px] font-[500] text-white hover:scale-95 transition-all ease-in duration-150"
          >
            Tạo mật khẩu mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestPassword;
