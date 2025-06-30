import { FaMapMarkerAlt, FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import logo from "../assets/images/logo_bct.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black w-full h-full p-10">
      <div className="grid grid-cols-12 gap-15">
        <div className="col-span-3">
          <div>
            <h3 className="text-white text-[18px] font-[600] uppercase">
              Giới thiệu
            </h3>
            <p className="text-white/60 mt-7">
              Mua Đồ Chơi Lego giá rẻ chính hãng ở HCM và Hà Nội tại Unik Brick.
              Chuyên kinh doanh, nhận order đặt hàng Lego giá rẻ chính hãng,
              xuất xứ Đan Mạch, thương hiệu đồ chơi lắp ráp bán chạy số 1 thế
              giới và các loại đồ chơi khác. Mua Đồ chơi mô hình nhân vật Funko
              Pop giá rẻ chính hãng ở HCM và Hà Nội tại Việt Nam.
            </p>
          </div>
          <ul className="mt-7 flex flex-col gap-5">
            <li className="flex gap-3 text-white/60">
              <FaMapMarkerAlt size={20} />
              158 Ba Đình Phường 10 Quận 8 Tp HCM
            </li>
            <li className="flex gap-3 text-white/60">
              <MdEmail size={20} />
              158 Ba Đình Phường 10 Quận 8 Tp HCM
            </li>
            <li className="flex gap-3 text-white/60">
              <FaPhoneSquareAlt size={20} />
              158 Ba Đình Phường 10 Quận 8 Tp HCM
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <h3 className="text-white text-[18px] font-[600] uppercase">
            Liên kết
          </h3>
          <div className="flex flex-col gap-3 mt-7">
            <Link
              to={"/"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Trang chủ
            </Link>
            <Link
              to={"/cua-hang"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Cửa hàng
            </Link>
            <Link
              to={"/bo-suu-tap"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Bộ sưu tập
            </Link>
            <Link
              to={"/tin-tuc"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Tin tức
            </Link>
            <Link
              to={"/gioi-thieu"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Giới thiệu
            </Link>
            <Link
              to={"/lien-he"}
              className="text-white/60 hover:text-Primary transition-all ease-in"
            >
              Liên hệ
            </Link>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-white text-[18px] font-[600] uppercase">
            HỖ TRỢ KHÁCH HÀNG
          </h3>
          <div className="flex flex-col gap-3 mt-7">
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Điều Khoản - Điều Kiện
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Phân Biệt LEGO Thật
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Hướng Dẫn Đặt Hàng
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Chính Sách Đổi Trả
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Chính Sách Giao Nhận
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Chính Sách Thanh Toán
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Chính Sách Bảo Mật
            </Link>
            <Link className="text-white/60 hover:text-Primary transition-all ease-in">
              Câu Hỏi Thường Gặp
            </Link>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-white text-[18px] font-[600] uppercase mb-7">
            Đăng kí nhận tin
          </h3>
          <div className="flex flex-col gap-7">
            <div>
              <div className="w-[80%] flex p-2 border-b border-gray-300 gap-5">
                <input
                  type="text"
                  placeholder="Nhập email của bạn"
                  className="text-white/60 outline-none w-full"
                />
                <IoIosSend className="text-white/60 cursor-pointer" size={25} />
              </div>
              <p className="text-white/60 mt-7">
                Hãy nhập email của bạn vào đây để nhận tin!
              </p>
            </div>
            <img src={logo} alt="" className="object-cover w-[150px]" />
          </div>
        </div>
      </div>
      <marquee className="text-white mt-10 ">
        © 2025 BRICKZONE - Thế giới đồ chơi LEGO chính hãng (TP. Hồ Chí Minh và
        Hà Nội)
      </marquee>
    </div>
  );
};

export default Footer;
