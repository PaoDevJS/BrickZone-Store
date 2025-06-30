import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const linkUrlChangePassword =
    "http://localhost:3000/api/v1/user/change-password";

  const btnChangePassword = async () => {
    try {
      const result = await axios.post(linkUrlChangePassword, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setFormData({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(result.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    btnChangePassword();
  };

  return (
    <div className="w-[80%] p-10 flex items-center flex-col shadow-lg shadow-Gray/30 rounded-md border-gray-100">
      <div>
        <h1 className="text-2xl text-gray-700 text-center">
          Thay đổi mật khẩu
        </h1>
        <p className="text-gray-500 mt-2">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>
      </div>
      <form className="w-[35%] mt-10 flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-[15px] text-gray-700">
            Mật khẩu hiện tại:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={onChangeFormData}
            value={formData.password}
            placeholder="Nhập mật khẩu cũ tại đây..."
            className="border border-gray-200 p-3 rounded outline-none placeholder:font-[500]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="newPassword" className="text-[15px] text-gray-700">
            Mật khẩu mới:
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={onChangeFormData}
            value={formData.newPassword}
            placeholder="Nhập mật khẩu mới tại đây..."
            className="border border-gray-200 p-3 rounded outline-none placeholder:font-[500]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="confirmPassword"
            className="text-[15px] text-gray-700"
          >
            Nhập lại mật khẩu:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={onChangeFormData}
            value={formData.confirmPassword}
            placeholder="Nhập lại mật khẩu tại đây..."
            className="border border-gray-200 p-3 rounded outline-none placeholder:font-[500]"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-Primary rounded-md py-2 text-lg font-[500] mt-5 text-white cursor-pointer hover:scale-95 transition-all ease-in duration-150"
        >
          Thay đổi
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
