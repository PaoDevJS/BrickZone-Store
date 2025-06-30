import { Link } from "react-router-dom";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="w-[80%] shadow-lg shadow-Gray/30 p-15 pt-5 rounded-md border-gray-100 border">
      <div>
        <div className="mt-5">
          <h1 className="text-2xl font-[500]">Hồ sơ của tôi</h1>
          <p className="text-[15px] text-gray-700">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="w-[70%] flex flex-col items-center m-auto mt-10 gap-10">
          <div className="w-[40%]">
            <img
              src={user.imgUrl}
              alt="Ảnh đại diện"
              className="w-[100px] h-[100px] m-auto border rounded-full border-gray-300"
            />
          </div>
          <div className="w-[60%] flex flex-col gap-5">
            <div>
              <h1 className="text-[16px] text-gray-600">Tên đăng nhập:</h1>
              <p className="border border-gray-200 rounded-md py-2 px-4 mt-2 text-[16px]">
                {user.username}
              </p>
            </div>
            <div>
              <h1 className="text-[16px] text-gray-600">Họ và tên:</h1>
              <p className="border border-gray-200 rounded-md py-2 px-4 mt-2 text-[16px]">
                {user.firstName + " " + user.lastName}
              </p>
            </div>
            <div>
              <h1 className="text-[16px] text-gray-600">Email:</h1>
              <p className="border border-gray-200 rounded-md py-2 px-4 mt-2 text-[16px]">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
