import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const UpdateItemAddress = ({ setBox, box, isFetchApiData }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
  });
  const onChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const linkUrlApiUpdateItemAddress =
    "http://localhost:3000/api/v1/address/update-item-address";
  const handleUpdateItemAddress = async () => {
    try {
      const result = await axios.put(
        `${linkUrlApiUpdateItemAddress}/${box.address_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success(result.data?.message);
      setFormData({
        fullname: "",
        phone: "",
        address: "",
      });
      setBox({ show: false, address_id: "" });
      isFetchApiData()
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };

  //   lấy dữ liệu địa chỉ
  const linkUrlApiGetItemAddress =
    "http://localhost:3000/api/v1/address/get-item-address";
  useEffect(() => {
    const isFetchApiDataItem = async () => {
      try {
        const result = await axios.get(
          `${linkUrlApiGetItemAddress}/${box.address_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setFormData({
          fullname: result.data[0]?.fullname,
          phone: result.data[0]?.phone,
          address: result.data[0]?.address,
        });
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    isFetchApiDataItem();
  }, [box.address_id]);

  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 bg-Gray/20 z-50`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[30%] min-h-[40%] bg-white rounded-md border border-gray-100 p-5">
          <h1 className="text-2xl font-[500] pb-3 border-b border-gray-300 text-gray-600">
            Cập nhật địa chỉ
          </h1>
          <form
            className="flex flex-col gap-7 mt-7"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h3 className="text-[16px] text-gray-600">Họ và tên:</h3>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={onChangeFormData}
                placeholder="Nhập họ và tên tại đây..."
                className="outline-none border border-gray-300 mt-2 rounded p-3 w-full placeholder:font-[500]"
              />
            </div>
            <div>
              <h3 className="text-[16px] text-gray-600">Số điện thoại:</h3>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={onChangeFormData}
                placeholder="Nhập số điện thoại tại đây..."
                className="outline-none border border-gray-300 mt-2 rounded p-3 w-full placeholder:font-[500]"
              />
            </div>
            <div>
              <h3 className="text-[16px] text-gray-600">Địa chỉ:</h3>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangeFormData}
                placeholder="Nhập địa chỉ tại đây..."
                className="outline-none border border-gray-300 mt-2 rounded p-3 h-[120px] w-full placeholder:font-[500]"
              />
            </div>
            <div>
              <button
                onClick={handleUpdateItemAddress}
                className="bg-Primary rounded py-2 w-[120px] text-[16px] font-[500] cursor-pointer text-white float-end ml-5"
              >
                Cập nhật
              </button>
              <button
                onClick={() => setBox({ show: false, address_id: "" })}
                className="bg-gray-400 rounded py-2 w-[120px] text-[16px] font-[500] cursor-pointer float-end"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemAddress;
