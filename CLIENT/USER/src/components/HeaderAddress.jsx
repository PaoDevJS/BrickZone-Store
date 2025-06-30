import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HeaderAddress = ({ isFetchApiData }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const linkUrlApiCreateAddress =
    "http://localhost:3000/api/v1/address/create-address";

  const onChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const handleCreateAddress = async () => {
    try {
      const result = await axios.post(linkUrlApiCreateAddress, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      isFetchApiData()
      toast.success(result.data?.message);
      setShow(false);
      setFormData({
        fullname: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="border-b pb-5 px-3 border-gray-300 flex items-center justify-between">
        <h1 className="text-2xl font-[500] text-gray-600">Địa chỉ của tôi</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-Primary py-2 px-5 rounded-md font-[500] text-white text-[16px] cursor-pointer"
        >
          Thêm địa chỉ
        </button>
      </div>
      <div
        className={`${
          show ? "fixed" : "hidden"
        } top-0 right-0 left-0 bottom-0 bg-Gray/20 z-50`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[30%] min-h-[40%] bg-white rounded-md border border-gray-100 p-5">
            <h1 className="text-2xl font-[500] pb-3 border-b border-gray-300 text-gray-600">
              Địa chỉ mới
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
                  onClick={handleCreateAddress}
                  className="bg-Primary rounded py-2 w-[120px] text-[16px] font-[500] cursor-pointer text-white float-end ml-5"
                >
                  Thêm
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="bg-gray-400 rounded py-2 w-[120px] text-[16px] font-[500] cursor-pointer float-end"
                >
                  Quay lại
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAddress;
