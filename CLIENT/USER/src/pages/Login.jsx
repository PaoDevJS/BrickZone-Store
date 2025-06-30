import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChangeDataForm = (valid) => {
    setDataForm((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const linkUrlApiLogin = "http://localhost:3000/api/v1/auth/login-auth"
  const fetchApiSubmitSignIn = async () => {
    try {
      const result = await axios.post(linkUrlApiLogin, dataForm)
      localStorage.setItem("accessToken", result.data?.token)
      localStorage.setItem("userInfo", JSON.stringify(result.data?.auth))
      toast.success(result.data?.message)
      navigate(-1)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleSubmitLogin = e => {
    e.preventDefault()
    fetchApiSubmitSignIn()
  }
  return (
    <div className="w-full my-15 flex items-center justify-center">
      <div className="w-[25%] min-h-[50%]">
        <div className="flex flex-col gap-2">
          <p className="font-[600] text-[16px]">Chào mừng bạn đến với</p>
          <h1 className="text-Primary text-5xl uppercase FontCherry">
            BrickZone
          </h1>
          <p className="text-[#4c4a48]">
            Bạn chưa có tài khoản?{" "}
            <Link
              to={"/dang-ky"}
              className="font-[500] underline text-black hover:text-Primary transition-all duration-200 ease-in"
            >
              Đăng ký tại đây.
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-5 mt-10">
          <h3 className="font-[500] text-[16px]">
            Hãy nhập thông tin tài khoản của bạn
          </h3>
          <div className="p-3 border border-gray-300 rounded-md">
            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChangeDataForm}
              placeholder="Nhập email tại đây..."
              className="w-full outline-none placeholder:font-[600]"
              required
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md flex items-center gap-3">
            <input
              type={eye ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChangeDataForm}
              placeholder="Nhập mật khẩu tại đây..."
              className="w-full outline-none placeholder:font-[600]"
              required
            />
            {eye ? (
              <FaEye
                size={20}
                onClick={() => setEye(false)}
                className="text-gray-400 hover:text-black transition-all duration-200 ease-in cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setEye(true)}
                size={20}
                className="text-gray-400 hover:text-black transition-all duration-200 ease-in cursor-pointer"
              />
            )}
          </div>
          <Link to="/khoi-phuc-mat-khau" className="hover:underline hover:text-Primary font-[500] text-[#4c4a48]">
            Quên mật khẩu?
          </Link>
          <button onClick={handleSubmitLogin} className="bg-Primary w-full rounded-md py-3 uppercase text-[18px] font-[700] text-white cursor-pointer">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
