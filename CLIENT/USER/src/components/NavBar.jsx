import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex items-center gap-7">
      <Link to={"/"} className="text-[16px] font-[500]">
        Trang chủ
      </Link>
      <Link to={"/cua-hang"} className="text-[16px] font-[500]">
        Cửa hàng
      </Link>
      <Link to={"/bo-suu-tap"} className="text-[16px] font-[500]">
        Bộ sưu tập
      </Link>
      <Link to={"/tin-tuc"} className="text-[16px] font-[500]"> 
        Tin tức
      </Link>
      <Link to={"/gioi-thieu"} className="text-[16px] font-[500]"> 
        Giới thiệu
      </Link>
      <Link to={"/lien-he"} className="text-[16px] font-[500]">
        Liên hệ
      </Link>
    </nav>
  );
};

export default NavBar;
