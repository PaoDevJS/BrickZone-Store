import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";
import { FaEraser } from "react-icons/fa6";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [search, setSearch] = useState("");

  const linkUrlApiGetAllCategories =
    "http://localhost:3000/api/v1/categories/get-all-categories";
  const linkUrlApiDeleteItemCategories = `http://localhost:3000/api/v1/categories/delete-item-category/`;
  const count = 6;

  const fetchApiDataToServer = async () => {
    try {
      const result = await axios.get(linkUrlApiGetAllCategories);
      setCategories(result.data?.categories);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApiDataToServer();
  }, []);

  const handlePrevious = () => {
    if (page <= 1 && limit <= 0) return;

    setPage((p) => p - 1);
    setLimit((p) => p - count);
  };

  const handleNext = () => {
    if (categories.length < limit || categories.length <= count * page) return;
    setPage((p) => p + 1);
    setLimit((p) => p + count);
  };

  const handleDeleteItemCategory = async (id) => {
    try {
      const result = await axios.delete(
        `${linkUrlApiDeleteItemCategories}${id}`
      );
      toast.success(result.data.message);
      fetchApiDataToServer();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-[700] uppercase">Danh sách danh mục</h1>
        <Link
          to={"/quan-ly-danh-muc/tao-danh-muc-moi"}
          className="flex items-center gap-3 bg-RedDrank/95 rounded-md p-3 text-white "
        >
          <FaPlus size={16} />
          <span className="text-[16px] font-[600]">Tạo danh mục</span>
        </Link>
      </div>
      <div className="flex gap-3 items-center border w-[50%] p-3 my-5 rounded-md border-gray-300">
        <FaSearch size={18} className="text-gray-500" />
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm danh mục tại đây..."
          className="w-full outline-none placeholder:font-[600]"
          onChange={(vail) => setSearch(vail.currentTarget.value.trim())}
        />
      </div>
      <div className="h-[80%] flex flex-col justify-between gap-5">
        <table className="table-fixed border border-gray-500 rounded-lg overflow-hidden max-h-full w-full">
          <thead>
            <tr className="bg-RedDrank text-white">
              <th className="w-[5%] text-center border py-2 uppercase">STT</th>
              <th className="w-[35%] text-center border py-2 uppercase">
                Tên danh mục
              </th>
              <th className="w-[45%] text-center border py-2 uppercase">
                Mô tả
              </th>
              <th className="w-[15%] text-center border py-2 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter((item) => item.name.toLowerCase().includes(search))
              .slice(limit, page * count)
              .map((item, index) => (
                <tr key={index} className=" odd:bg-[#e7e7e9] even:bg-[#fdfdfd]">
                  <td className="w-[5%] text-center py-2 px-4">
                    #{limit + index + 1}
                  </td>
                  <td className="w-[35%] text-center py-2 px-4">
                    {item.name}
                  </td>
                  <td className="w-[45%] text-center py-2 px-4">
                    {item.desc}
                  </td>
                  <td className="w-[15%] text-center py-2 px-4">
                    <div className="flex items-center justify-center gap-5">
                      <Link
                        to={`/quan-ly-danh-muc/chinh-sua-danh-muc/${item._id}`}
                        className="bg-yellow-500 p-2 rounded text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteItemCategory(item._id)}
                        className="bg-RedDrank p-2 rounded text-white cursor-pointer"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end px-10 gap-3">
          <button
            onClick={handlePrevious}
            className="cursor-pointer text-gray-300 hover:text-black transition-all duration-300 ease-initial"
          >
            <GrFormPrevious size={20} />
          </button>
          <p className="py-1 text-center rounded-md border border-gray-300 w-[7%]">
            {page}
          </p>
          <button
            onClick={handleNext}
            className="cursor-pointer text-gray-300 hover:text-black transition-all duration-300 ease-initial"
          >
            <GrFormNext size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCategories;
