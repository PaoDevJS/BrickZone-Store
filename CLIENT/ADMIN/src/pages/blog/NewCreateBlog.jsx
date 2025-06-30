import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const NewCreateBlog = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    content: "",
  });

  const handleChangeFormData = (valid) => {
    setFormData((p) => ({ ...p, [valid.target.name]: valid.target.value }));
  };

  const linkUrlApiNewCreateBlog =
    "http://localhost:3000/api/v1/blog/create-blog";

  const IsNewCreateBlog = async () => {
    try {
      const dataForm = new FormData();
      dataForm.append("imgBlog", imgUrl);
      dataForm.append("title", formData.title);
      dataForm.append("desc", formData.desc);
      dataForm.append("content", formData.content);

      const result = await axios.post(linkUrlApiNewCreateBlog, dataForm);
      toast.success(result?.data?.message);
      setFormData({
        title: "",
        desc: "",
        content: "",
      });
      setImgUrl("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmitNewCreateBlog = (e) => {
    e.preventDefault();
    IsNewCreateBlog();
  };

  return (
    <div className="w-full h-full relative overflow-y-scroll Scroller">
      <Link
        to={"/quan-ly-tin-tuc/danh-sach-tin-tuc"}
        className="flex items-center gap-1 text-gray-500 hover:text-black transition-all duration-300 ease-linear absolute top-0 left-0"
      >
        <IoMdArrowRoundBack size={16} />
        <span className="font-[500]">Quay lại</span>
      </Link>
      <h1 className="uppercase font-[700] text-xl text-center py-5 text-gray-700">
        Thêm Bài Viết Mới
      </h1>
      <form className="w-[60%] m-auto py-5 flex flex-col gap-5">
        <div>
          <label
            htmlFor="title"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Tiêu đề:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChangeFormData}
            placeholder="Nhập tiêu đề tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600]"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Mô tả:
          </label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChangeFormData}
            placeholder="Nhập tiêu đề tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600] max-h-[200px] min-h-[200px]"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Nội dung:
          </label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChangeFormData}
            placeholder="Nhập nội dung tại đây..."
            className="border border-gray-300 outline-none w-full mt-3 p-3 rounded-md placeholder:font-[600] max-h-[400px] min-h-[400px]"
          />
        </div>
        <div>
          <h2 className="min-w-[25%] text-[16px] font-[600] text-gray-600 mb-3">
            Ảnh:
          </h2>
          <div className="border border-gray-300 w-[150px] h-[150px] rounded-md overflow-hidden">
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
          onClick={handleSubmitNewCreateBlog}
          className="bg-RedDrank w-full py-3 rounded-md text-white uppercase text-[18px] font-[600] cursor-pointer mt-7"
        >
          Thêm bài viết
        </button>
      </form>
    </div>
  );
};

export default NewCreateBlog;
