import { Link, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaSquareParking, FaRegNewspaper, FaBlogger } from "react-icons/fa6";
import { FaUsers, FaShoppingCart, FaListOl } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "react-toastify";

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("userInfoAdmin"));
  const navigate = useNavigate();
  const handleSubmitLogout = () => {
    localStorage.removeItem("accessTokenAdmin");
    localStorage.removeItem("userInfoAdmin");
    navigate("/dang-nhap");
    toast.success("Đăng xuất tài khoản thàng công.");
  };
  return (
    user && (
      <div className="w-[20%] h-full fixed top-0 left-0 z-50">
        <div className="bg-white h-full w-full shadow-lg">
          <div className="w-full h-[10%] flex items-center justify-center">
            <div className="flex items-center gap-5">
              <img src={user.imgUrl} className="rounded-full w-[55px] h-[55px]" />
              <div>
                <h1 className="font-[700] text-lg uppercase">
                  {user.firstName + " " + user.lastName}
                </h1>
                <p className="font-[600] text-[12px] text-gray-600 truncate uppercase">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-[90%] flex flex-col justify-between items-center py-7">
            <div className="py-4 px-7 flex flex-col gap-3">
              <Link
                to={"/"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <BiSolidDashboard size={25} />
                <h3 className="font-[700] text-[16px]">Tổng quan</h3>
              </Link>
              <Link
                to={"/quan-ly-danh-muc/danh-sach-danh-muc"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaListOl size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý danh mục</h3>
              </Link>
              <Link
                to={"/quan-ly-nha-cung-cap/danh-sach-nha-cung-cap"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaBlogger size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý nhà cung cấp</h3>
              </Link>
              <Link
                to={"/quan-ly-san-pham/danh-sach-san-pham"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaSquareParking size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý sản phẩm</h3>
              </Link>
              <Link
                to={"/quan-ly-khach-hang/danh-sach-khach-hang"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaUsers size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý khách hàng</h3>
              </Link>
              <Link
                to={"/quan-ly-don-hang"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaShoppingCart size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý đơn hàng</h3>
              </Link>
              <Link
                to={"/quan-ly-tin-tuc/danh-sach-tin-tuc"}
                className="flex items-center gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
              >
                <FaRegNewspaper size={25} />
                <h3 className="font-[700] text-[16px]">Quản lý bài viết</h3>
              </Link>
            </div>

            <button
              onClick={handleSubmitLogout}
              className="font-[700] w-[80%] flex items-center justify-center border uppercase border-RedDrank text-RedDrank cursor-pointer text-[16px] gap-3 hover:bg-RedDrank hover:text-white py-3 px-4 rounded-md transition-all duration-300 ease-initial"
            >
              <IoMdLogOut size={25} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SideBar;
