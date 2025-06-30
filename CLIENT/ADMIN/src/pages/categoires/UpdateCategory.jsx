import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    desc: "",
  });
  const navigate = useNavigate();
  const handleChangeDataForm = (valid) => {
    setDataForm((p) => ({
      ...p,
      [valid.target.name]: valid.target.value.trim(),
    }));
  };

  const { id } = useParams();

  const linkApiGetItemCategories = `http://localhost:3000/api/v1/categories/get-item-category/${id}`;
  const linkApiUpdateItemCategories = `http://localhost:3000/api/v1/categories/update-item-category/${id}`;

  useEffect(() => {
    const fetchApiGetItemCategories = async () => {
      try {
        const result = await axios.get(linkApiGetItemCategories);
        setDataForm({
          name: result.data.category.name,
          desc: result.data.category.desc,
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchApiGetItemCategories();
  }, [linkApiGetItemCategories]);

  const handleBtnUpdateItemCategories = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(linkApiUpdateItemCategories, dataForm);
      toast.success(result.data.message);
      navigate("/quan-ly-danh-muc/danh-sach-danh-muc");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Link
        to={"/quan-ly-danh-muc/danh-sach-danh-muc"}
        className="flex items-center gap-1 text-gray-500 hover:text-black transition-all duration-300 ease-linear absolute top-0 left-0"
      >
        <IoMdArrowRoundBack size={16} />
        <span className="font-[500]">Quay lại</span>
      </Link>
      <h1 className="uppercase font-[700] text-xl text-center py-5 text-gray-700">
        Chỉnh sửa Danh Mục
      </h1>
      <form className="w-[60%] m-auto py-5 flex flex-col gap-7">
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600"
          >
            Tên danh mục:
          </label>
          <input
            type="text"
            value={dataForm.name}
            onChange={handleChangeDataForm}
            name="name"
            id="name"
            placeholder="Nhập tên danh mục tại đây..."
            className="border p-3 w-full rounded border-gray-300 placeholder:font-[600] outline-none"
          />
        </div>
        <div className="flex">
          <label
            htmlFor="desc"
            className="min-w-[25%] text-[16px] font-[600] text-gray-600 mt-5"
          >
            Mô tả danh mục:
          </label>
          <textarea
            value={dataForm.desc}
            name="desc"
            onChange={handleChangeDataForm}
            placeholder="Nhập mô tả danh mục tại đây..."
            className="border p-3 w-full min-h-[200px] max-h-[200px] rounded border-gray-300 placeholder:font-[600] outline-none"
          />
        </div>

        <button
          onClick={handleBtnUpdateItemCategories}
          className="bg-RedDrank w-full py-3 rounded-md text-white uppercase text-[18px] font-[600] cursor-pointer mt-7"
        >
          Cập nhập
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
