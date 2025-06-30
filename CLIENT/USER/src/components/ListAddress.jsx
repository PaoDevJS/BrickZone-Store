import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import UpdateItemAddress from "../utils/UpdateItemAddress";

const ListAddress = ({ listAddress, isFetchApiData }) => {
  const [box, setBox] = useState({
    show: false,
    address_id: "",
  });

  const linkUrlApiDeleteItemAddress =
    "http://localhost:3000/api/v1/address/delete-item-address";

  // Xóa địa chỉ
  const handleDeleteItemAddress = async (id) => {
    try {
      const result = await axios.delete(
        `${linkUrlApiDeleteItemAddress}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success(result.data?.message);
      isFetchApiData();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="my-7 flex flex-col gap-7">
      {listAddress &&
        listAddress.map((item, index) => (
          <div
            key={index}
            className="px-5 py-2 flex items-center justify-between"
          >
            <div className="w-[45%] text-[16px] flex flex-col gap-2">
              <h3>
                <span className="font-[500] text-gray-800 mr-2">
                  Họ và tên:
                </span>{" "}
                {item.fullname}
              </h3>
              <p>
                <span className="font-[500] text-gray-800 mr-2">
                  Số điện thoại:
                </span>{" "}
                {item.phone}
              </p>
              <p>
                <span className="font-[500] text-gray-800 mr-2">Địa chỉ:</span>{" "}
                {item.address}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <button
                  onClick={() => setBox({ show: true, address_id: item._id })}
                  className="bg-yellow-300 text-yellow-700 p-2 rounded cursor-pointer hover:bg-yellow-400 hover:text-white transition-all ease-in"
                >
                  <FaEdit size={20} />
                </button>
                {
                  box.show ? <UpdateItemAddress isFetchApiData={isFetchApiData} box={box} setBox={setBox}/> : null
                }
              </div>
              <button
                onClick={() => handleDeleteItemAddress(item._id)}
                className="bg-red-300 text-red-700 p-2 rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all ease-in"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListAddress;
