import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const CreateSupplier = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [imgUrl, setImgUrl] = useState("");
  const linkApiCreateSupplier = `http://localhost:3000/api/v1/supplier/create-supplier`;

  const handleChangeDataForm = (valid) => {
    setDataForm((v) => ({
      ...v,
      [valid.target.name]: valid.target.value.trim(),
    }));
  };

  const NewCreateSupplier = async () => {
    try {
      const formData = new FormData();
      formData.append("imgUrl", imgUrl);
      formData.append("email", dataForm.email);
      formData.append("phone", dataForm.phone);
      formData.append("address", dataForm.address);
      formData.append("name", dataForm.name);

      const result = await axios.post(linkApiCreateSupplier, formData);
      toast.success(result.data?.message);
      setImgUrl("");
      setDataForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleBtnCreateSupplier = (e) => {
    e.preventDefault();
    NewCreateSupplier();
  };

  return (
    <div className="w-full h-full relative overflow-y-scroll Scroller">
      <Link
        to={"/quan-ly-nha-cung-cap/danh-sach-nha-cung-cap"}
        className="flex items-center gap-1 text-gray-500 hover:text-black transition-all duration-300 ease-linear absolute top-0 left-0"
      >
        <IoMdArrowRoundBack size={16} />
        <span className="font-[500]">Quay lại</span>
      </Link>
      <h1 className="uppercase font-[700] text-xl text-center py-5 text-gray-700">
        Thêm Nhà Cung Cấp Mới
      </h1>
      <form className="w-[60%] m-auto py-5 flex flex-col gap-7">
        <div>
          <label
            htmlFor="name"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Tên nhà cung cấp:
          </label>
          <input
            type="text"
            value={dataForm.name}
            onChange={handleChangeDataForm}
            name="name"
            id="name"
            placeholder="Nhập tên nhà cung cấp tại đây..."
            className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none mt-3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Email:
          </label>
          <input
            type="text"
            value={dataForm.email}
            onChange={handleChangeDataForm}
            name="email"
            id="email"
            placeholder="Nhập email tại đây..."
            className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none mt-3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Số điện thoại:
          </label>
          <input
            type="text"
            value={dataForm.phone}
            onChange={handleChangeDataForm}
            name="phone"
            id="phone"
            placeholder="Nhập số điện thoại tại đây..."
            className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none mt-3"
            required
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Địa chỉ:
          </label>
          <input
            type="text"
            value={dataForm.address}
            onChange={handleChangeDataForm}
            name="address"
            id="address"
            placeholder="Nhập địa chỉ tại đây..."
            className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none mt-3"
            required
          />
        </div>
        <div>
          <h2 className="min-w-[25%] text-[16px] font-[600] text-gray-600">
            Ảnh đại diện:
          </h2>
          <div className="border border-gray-300 w-[150px] h-[150px] rounded-md overflow-hidden mt-3">
            {imgUrl ? (
              <label htmlFor="imgUrl">
                <img
                  src={URL.createObjectURL(imgUrl)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </label>
            ) : (
              <label htmlFor="imgUrl">
                <img
                  src="https://media.istockphoto.com/id/1021471354/vector/image-upload-icon.jpg?s=612x612&w=0&k=20&c=TBKGW7vES1EtPcaxIvCAKxXL0W9EGd5FPBWHhtC2kFg="
                  alt=""
                  className="w-full h-full object-cover"
                />
              </label>
            )}
            <input
              type="file"
              onChange={(valid) => setImgUrl(valid.target.files[0])}
              name="imgUrl"
              id="imgUrl"
              placeholder="Nhập địa chỉ tại đây..."
              className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none"
              hidden
              required
            />
          </div>
        </div>
        <button
          onClick={handleBtnCreateSupplier}
          className="bg-RedDrank w-full py-3 rounded-md text-white uppercase text-[18px] font-[600] cursor-pointer mt-7"
        >
          Thêm mới
        </button>
      </form>
    </div>
  );
};

export default CreateSupplier;
