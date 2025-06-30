import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewCreateUser = () => {
  const [eye, setEye] = useState(false);
  const [dataForm, setDataForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const isOnchangeFormData = (valid) => {
    setDataForm((v) => ({ ...v, [valid.target.name]: valid.target.value }));
  };
  const linkUrlApiAddAccountUser =
    "http://localhost:3000/api/v1/auth/create-auth";
  const isFetchApiAddAccountUser = async () => {
    try {
      const result = await axios.post(linkUrlApiAddAccountUser, dataForm);
      toast.success(result.data?.message);
      navigate(-1)
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const handleAddAccountUser = (e) => {
    e.preventDefault();
    isFetchApiAddAccountUser();
  };
  return (
    <div className="w-full h-full relative overflow-y-scroll Scroller">
      <Link
        to={"/quan-ly-khach-hang/danh-sach-khach-hang"}
        className="flex items-center gap-1 text-gray-500 hover:text-black transition-all duration-300 ease-linear absolute top-0 left-0"
      >
        <IoMdArrowRoundBack size={16} />
        <span className="font-[600]">Quay lại</span>
      </Link>
      <h1 className="uppercase font-[700] text-xl text-center py-5 text-gray-700">
        Thêm khách hàng Mới
      </h1>
      <form className="w-[60%] m-auto py-5 flex flex-col gap-5">
        <div className="flex items-center w-full justify-between">
          <div className="w-[45%]">
            <label
              htmlFor="firstName"
              className="text-[16px] font-[600] text-gray-600"
            >
              Họ:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={dataForm.firstName}
              onChange={isOnchangeFormData}
              placeholder="Nhập họ tại đây..."
              className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
            />
          </div>
          <div className="w-[45%]">
            <label
              htmlFor="lastName"
              className="text-[16px] font-[600] text-gray-600"
            >
              Tên:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={isOnchangeFormData}
              value={dataForm.lastName}
              placeholder="Nhập tên tại đây..."
              className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="text-[16px] font-[600] text-gray-600"
          >
            Tên đăng nhập:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={isOnchangeFormData}
            value={dataForm.username}
            placeholder="Nhập tên đăng nhập tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-[16px] font-[600] text-gray-600"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={isOnchangeFormData}
            value={dataForm.email}
            placeholder="Nhập email tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-[16px] font-[600] text-gray-600"
          >
            Mật khẩu:
          </label>
          <div className="p-3 border border-gray-300 rounded-md flex items-center gap-3 mt-3">
            <input
              type={eye ? "text" : "password"}
              placeholder="Nhập mật khẩu tại đây..."
              name="password"
              id="password"
              onChange={isOnchangeFormData}
              value={dataForm.password}
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
        </div>
        <button
          onClick={handleAddAccountUser}
          className="bg-RedDrank w-full py-3 rounded-md text-white uppercase text-[18px] font-[600] cursor-pointer mt-7"
        >
          Thêm Tài Khoản
        </button>
      </form>
    </div>
  );
};

export default NewCreateUser;
