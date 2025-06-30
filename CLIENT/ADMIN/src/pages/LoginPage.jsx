import "../styles/Login.style.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };
  const linkUrlApiSignIn = "http://localhost:3000/api/v1/auth/login-auth";
  const navigate = useNavigate()
  const FetchApiSubmitSignIn = async () => {
    try {
      const result = await axios.post(linkUrlApiSignIn, formData);
      if (result.data?.auth?.role !== "admin") {
        toast.error("Vui lòng đăng nhập tài khoản quản trị viên.");
        return;
      }
      localStorage.setItem("accessTokenAdmin", result.data?.token);
      localStorage.setItem("userInfoAdmin", JSON.stringify(result.data?.auth));
      toast.success(result.data?.message);
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    FetchApiSubmitSignIn();
  };

  return (
    <div className="min-h-screen bg-banner flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 space-y-6">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-[700] uppercase text-gray-800">
            đăng nhập
          </h2>
          <p className="text-md font-[500] text-gray-500 mt-2">
            Vui lòng đăng nhập tài khoản quản trị viên để tiếp tục
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-[600]"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChangeFormData}
              className="w-full border border-gray-300 rounded-md p-3 outline-none placeholder:font-[600]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-[600]"
            >
              Mật khẩu:
            </label>
            <div className="border border-gray-300 rounded-md p-3 flex items-center gap-3">
              <input
                id="password"
                type={show ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChangeFormData}
                className="w-full outline-none"
                placeholder="••••••••"
              />
              {show ? (
                <FaEye
                  size={20}
                  onClick={() => setShow(false)}
                  className="cursor-pointer text-gray-400 hover:text-black transition-all duration-300 ease-in"
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  onClick={() => setShow(true)}
                  className="cursor-pointer text-gray-400 hover:text-black transition-all duration-300 ease-in"
                />
              )}
            </div>
          </div>

          <button
            onClick={handleSubmitLogin}
            type="submit"
            className="w-full bg-RedDrank text-white font-semibold py-3 rounded-md uppercase
              hover:bg-RedDrank/85 transition-all duration-300 ease-linear cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 font-[600]">
          © Hệ thống quản trị {new Date().getFullYear()}. Mọi quyền được bảo
          lưu.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
