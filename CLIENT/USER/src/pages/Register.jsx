import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"
import axios from 'axios'

const Register = () => {
  const [eye, setEye] = useState(false);
  const [confirmEye, setConfirmEye] = useState(false);
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate()

  const handleChangeDataForm = (valid) => {
    setDataForm((p) => ({
      ...p,
      [valid.target.name]: valid.target.value,
    }));
  };

  const linkUrlApiRegister = "http://localhost:3000/api/v1/auth/create-auth"
  const fetchApiSubmitRegister = async () => {
    try {
      const result = await axios.post(linkUrlApiRegister, dataForm)
      toast.success(result.data?.message)
      navigate("/dang-nhap")
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    fetchApiSubmitRegister()
  }

  return (
    <div className="w-full my-15 flex items-center justify-center">
      <div className="w-[25%] min-h-[50%]">
        <div>
          <h1 className="text-2xl uppercase font-[600]">Đăng ký tài khoản</h1>
          <p className="text-[#4c4a48] mt-2">
            Hãy nhập thông tin để đăng ký tài khoản !
          </p>
        </div>
        <form className="mt-10 flex flex-col gap-5">
          <div className="flex items-center gap-7">
            <div className="w-[50%] border border-gray-300 rounded-md p-3">
              <input
                type="text"
                name="firstName"
                placeholder="Nhập họ tại đây..."
                className="w-full placeholder:font-[600] outline-none"
                value={dataForm.firstName}
                onChange={handleChangeDataForm}
                required
              />
            </div>
            <div className="w-[50%] border border-gray-300 rounded-md p-3">
              <input
                type="text"
                name="lastName"
                placeholder="Nhập tên tại đây..."
                value={dataForm.lastName}
                onChange={handleChangeDataForm}
                className="w-full placeholder:font-[600] outline-none"
                required
              />
            </div>
          </div>
          <div className="p-3 border border-gray-300 rounded-md">
            <input
              type="username"
              name="username"
              placeholder="Nhập tên đăng nhập tại đây..."
              value={dataForm.username}
                onChange={handleChangeDataForm}
              className="w-full outline-none placeholder:font-[600]"
              required
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md">
            <input
              type="email"
              name="email"
              placeholder="Nhập email tại đây..."
              value={dataForm.email}
                onChange={handleChangeDataForm}
              className="w-full outline-none placeholder:font-[600]"
              required
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md">
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại tại đây..."
              value={dataForm.phone}
                onChange={handleChangeDataForm}
              className="w-full outline-none placeholder:font-[600]"
              required
            />
          </div>
          <div className="p-3 border border-gray-300 rounded-md flex items-center gap-3">
            <input
              type={eye ? "text" : "password"}
              placeholder="Nhập mật khẩu tại đây..."
              name="password"
              value={dataForm.password}
                onChange={handleChangeDataForm}
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

          <div className="p-3 border border-gray-300 rounded-md flex items-center gap-3">
            <input
              type={confirmEye ? "text" : "password"}
              placeholder="Nhập lại mật khẩu tại đây..."
              name="confirmPassword"
              value={dataForm.confirmPassword}
                onChange={handleChangeDataForm}
              className="w-full outline-none placeholder:font-[600]"
              required
            />
            {confirmEye ? (
              <FaEye
                size={20}
                onClick={() => setConfirmEye(false)}
                className="text-gray-400 hover:text-black transition-all duration-200 ease-in cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setConfirmEye(true)}
                size={20}
                className="text-gray-400 hover:text-black transition-all duration-200 ease-in cursor-pointer"
              />
            )}
          </div>

          <div>
            <button onClick={handleSubmitRegister} className="bg-Primary w-full rounded-md py-3 uppercase text-[18px] font-[700] text-white cursor-pointer">
              Tạo tài khoản
            </button>
            <p className="text-[#4c4a48] text-center mt-5">
              Bạn đã có tài khoản?{" "}
              <Link
                to={"/dang-nhap"}
                className="font-[500] underline text-black hover:text-Primary transition-all duration-200 ease-in"
              >
                Đăng nhập tại đây.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
