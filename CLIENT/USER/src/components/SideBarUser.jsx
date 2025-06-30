import { Link, useLocation } from "react-router-dom";

const SideBarUser = ({ user }) => {
  const path = useLocation().pathname.split("/")[2];

  return (
    <div className="w-[20%] max-h-[400px] p-10 shadow-lg shadow-Gray/30 border border-gray-100 rounded-md">
      <div className="flex items-center gap-5">
        <img
          src={user.imgUrl || `http://localhost:3000/${user.imgUrl}`}
          alt=""
          className="border border-gray-200 w-[45px] h-[45px] rounded-full"
        />
        <h4 className="text-[18px] font-[500] text-gray-700">
          {user.username}
        </h4>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <Link
          to={`/nguoi-dung/ho-so-ca-nhan/${user.id}`}
          className={`text-[16px] py-2 px-4 rounded-md hover:bg-Primary/30 hover:text-Primary hover:font-[500] transition-all ease-linear ${
            path === "ho-so-ca-nhan"
              ? "bg-Primary/30 text-Primary font-[500]"
              : ""
          }`}
        >
          Hồ sơ
        </Link>
        <Link
          to={`/nguoi-dung/dia-chi`}
          className={`text-[16px] py-2 px-4 rounded-md hover:bg-Primary/30 hover:text-Primary hover:font-[500] transition-all ease-linear ${
            path === "dia-chi"
              ? "bg-Primary/30 text-Primary font-[500]"
              : ""
          }`}
        >
          Địa chỉ
        </Link>
        <Link
          to={`/nguoi-dung/cap-nhap-mat-khau`}
          className={`text-[16px] py-2 px-4 rounded-md hover:bg-Primary/30 hover:text-Primary hover:font-[500] transition-all ease-linear ${
            path === "cap-nhap-mat-khau"
              ? "bg-Primary/30 text-Primary font-[500]"
              : ""
          }`}
        >
          Đổi mật khẩu
        </Link>
        <Link
          to={`/nguoi-dung/don-hang`}
          className={`text-[16px] py-2 px-4 rounded-md hover:bg-Primary/30 hover:text-Primary hover:font-[500] transition-all ease-linear ${
            path === "don-hang" ? "bg-Primary/30 text-Primary font-[500]" : ""
          }`}
        >
          Đơn hàng
        </Link>
      </div>
    </div>
  );
};

export default SideBarUser;
