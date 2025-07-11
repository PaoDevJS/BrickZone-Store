import axios from "axios";
import { useEffect, useState } from "react";

const ChooseAddress = ({ setInfoUser, infoUser }) => {
  const [listAddress, setListAddress] = useState([]);
  const [show, setShow] = useState(false);

  const linkUrlApiGetAllAddress =
    "http://localhost:3000/api/v1/address/get-all-address";

  useEffect(() => {
    const isFetchApiData = async () => {
      try {
        const result = await axios.get(linkUrlApiGetAllAddress, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setListAddress(result.data?.listAddress);
        setInfoUser(result.data?.listAddress[0]._id)
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    isFetchApiData();
  }, [setInfoUser]);
  return (
    <div className="border rounded-md border-gray-200">
      <div className="border-b border-gray-300 px-10 py-5 flex items-center justify-between">
        <h1 className="text-lg font-[500] text-gray-600">Địa chỉ nhận hàng</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-Primary py-2 px-7 rounded font-[500] text-white text-[16px] cursor-pointer"
        >
          Chọn
        </button>
      </div>
      <div className="px-10 py-5">
        {listAddress && listAddress
          .filter((item) => item._id.toString() === infoUser.toString())
          .map((item) => (
            <div key={item._id} className="w-[45%] text-[16px] flex flex-col gap-3">
              <p>
                <span className="text-gray-800 mr-2">Họ và tên:</span>{" "}
                {item.fullname}
              </p>
              <p>
                <span className="text-gray-800 mr-2">Số điện thoại:</span>{" "}
                {item.phone}
              </p>
              <p>
                <span className="text-gray-800 mr-2">Địa chỉ:</span>{" "}
                {item.address}
              </p>
            </div>
          ))}
      </div>

      <div
        className={`${
          show ? "fixed" : "hidden"
        } top-0 bottom-0 right-0 left-0 bg-Gray/30 z-50`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[30%] max-h-[70%] bg-white rounded">
            <h1 className="p-5 border-b border-gray-200 text-gray-600 text-[22px]">
              Địa chỉ của tôi
            </h1>
            <div className="p-5 border-b border-gray-200 flex flex-col gap-7">
              {listAddress &&
                listAddress.map((item) => (
                  <div key={item._id} className="flex items-center gap-5">
                    <input
                      type="radio"
                      onChange={(valid) => {
                        setInfoUser(valid.target.value), setShow(false);
                      }}
                      name="address"
                      id={item._id}
                      value={item._id}
                    />
                    <label htmlFor={item._id}>
                      <div className="w-full text-[16px] flex flex-col gap-2 cursor-pointer">
                        <h3>
                          <span className="text-[16px] text-gray-800 mr-2">
                            Họ và tên:
                          </span>{" "}
                          {item.fullname}
                        </h3>
                        <p>
                          <span className="text-[16px] text-gray-800 mr-2">
                            Số điện thoại:
                          </span>{" "}
                          {item.phone}
                        </p>
                        <p>
                          <span className="text-[16px] text-gray-800 mr-2">
                            Địa chỉ:
                          </span>{" "}
                          {item.address}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            <div className="p-5">
              <button onClick={() => setShow(false)} className="bg-Primary py-2 w-[200px] cursor-pointer rounded font-[500] text-white m-auto block">Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAddress;
