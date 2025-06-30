import NavBar from "./NavBar";
import { FaOpencart } from "react-icons/fa6";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "./Search";
import { useState } from "react";


const Header = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate()
  const path = useLocation().pathname.split("/")[1]
  const [show, setShow] = useState(false)
  
  const handleSubmitLogout = () => {
    if(path === "thanh-toan" || path === "nguoi-dung") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      toast.success("Đăng xuất tài khoản thành công");
      navigate("/dang-nhap")
      return;
    }

    localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      toast.success("Đăng xuất tài khoản thành công");
      navigate(0)
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 shadow-md bg-white shadow-Gray/30 py-5 px-10 z-30 `}
    >
      <div className="container m-auto ">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="FontCherry text-5xl uppercase text-Primary">
            BrickZone
          </Link>
          <NavBar />
          <div className="flex items-center gap-7">
            <div className="flex items-center gap-5">
              <div>
                <FaSearch onClick={() => setShow(true)} size={18} className="cursor-pointer"/>
                <Search show={show} setShow={setShow}/>
              </div>
              <Link to={"/gio-hang"} className="relative">
                <FaOpencart size={25} />
                <p className="absolute w-[15px] h-[15px] bg-Primary text-white top-0 right-0 rounded-full flex items-center justify-center text-[12px]">
                  5
                </p>
              </Link>
            </div>

            {user ? (
              <div className="group relative">
                <div className="flex items-center gap-3">
                  <img
                    src={user.imgUrl}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <h4 className="text-[16px] font-[500] text-gray-700">
                    {user.firstName + " " + user.lastName}
                  </h4>
                </div>
                <div className="absolute z-50 after:absolute after:w-[170px] after:h-[20px] after:top-[-18px] after:left-0 top-[50px] 2xl:left-[50%] 2xl:translate-x-[-50%] w-[170px] p-3 border border-gray-200 rounded-md shadow-md shadow-Gray/70 bg-white group-hover:flex group-hover:flex-col group-hover:gap-3 hidden">
                  <Link to={`/nguoi-dung/ho-so-ca-nhan/${user.id}`} className="w-full text-center block rounded-md py-2 px-3 text-[16px] font-[600] cursor-pointer hover:text-Primary hover:bg-Primary/20">
                    Hồ sơ
                  </Link>
                  <Link to={`/nguoi-dung/don-hang`} className="w-full text-center block rounded-md py-2 px-3 text-[16px] font-[600] cursor-pointer hover:text-Primary hover:bg-Primary/20">
                    Đơn hàng
                  </Link>
                  <button
                    onClick={handleSubmitLogout}
                    className="w-full block rounded-md py-2 px-3 text-[16px] font-[600] cursor-pointer hover:text-Primary hover:bg-Primary/20"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <FaRegUserCircle size={25} className="cursor-pointer" />
                <div className="absolute after:absolute after:w-[150px] after:h-[17px] after:top-[-17px] after:right-0 top-10 shadow-lg border border-Gray/30 shadow-black/50 w-[150px] p-3 rounded-md gap-3 bg-white left-[70%] translate-x-[-70%] z-30 hidden group-hover:flex group-hover:flex-col">
                  <Link
                    to={"/dang-ky"}
                    className="font-[600] text-[16px] p-3 text-center rounded-md hover:bg-Primary/30 hover:text-Primary transition-all ease-linear w-full"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    to={"/dang-nhap"}
                    className="font-[600] text-[16px] p-3 text-center rounded-md hover:bg-Primary/20 hover:text-Primary transition-all ease-linear w-full"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
