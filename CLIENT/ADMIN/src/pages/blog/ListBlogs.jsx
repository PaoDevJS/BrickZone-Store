import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const ListBlogs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const count = 5;

  const handlePrevious = () => {
    if (page <= 1 && limit <= 0) return;

    setPage((p) => p - 1);
    setLimit((p) => p - count);
  };

  const handleNext = () => {
    if (blogs.length < limit || blogs.length <= count * page) return;

    setPage((p) => p + 1);
    setLimit((p) => p + count);
  };

  const linkUrlApiListBlogs = "http://localhost:3000/api/v1/blog/get-all-blog";
  const linkUrlApiDeleteItemBlog =
    "http://localhost:3000/api/v1/blog/delete-item-blog/";

  const fetchApiGetAllListBlogs = async () => {
    try {
      const result = await axios.get(linkUrlApiListBlogs);
      setBlogs(result.data?.blogs);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApiGetAllListBlogs();
  }, []);

  const handleDeleteItemBlog = async (id) => {
    try {
      const result = await axios.delete(`${linkUrlApiDeleteItemBlog}${id}`);
      fetchApiGetAllListBlogs();
      toast.success(result?.data?.message);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-[700] uppercase">Danh sách bài viết</h1>
        <Link
          to={"/quan-ly-tin-tuc/them-tin-tuc-moi"}
          className="flex items-center gap-3 bg-RedDrank/95 rounded-md p-3 text-white "
        >
          <FaPlus size={16} />
          <span className="text-[16px] font-[600]">Thêm bài viết</span>
        </Link>
      </div>
      <div className="flex gap-3 items-center border w-[50%] p-3 my-5 rounded-md border-gray-300">
        <FaSearch size={18} className="text-gray-500" />
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm bài viết tại đây..."
          className="w-full outline-none placeholder:font-[600]"
          onChange={(vail) => setSearch(vail.target.value)}
        />
      </div>
      <div className="h-[80%] flex flex-col justify-between">
        <table className="table-fixed w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-RedDrank text-white">
              <th className="w-[5%] text-center border py-2 uppercase">STT</th>
              <th className="w-[15%] text-center border py-2 uppercase">Ảnh</th>
              <th className="w-[20%] text-center border py-2 uppercase">
                Tên bài viết
              </th>
              <th className="w-[15%] text-center border py-2 uppercase">
                Mô tả
              </th>
              <th className="w-[30%] text-center border py-2 uppercase">
                nội dung
              </th>
              <th className="w-[10%] text-center border py-2 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )
              .slice(limit, page * count)
              .map((item, index) => (
                <tr key={index} className=" odd:bg-[#e7e7e9] even:bg-[#fdfdfd]">
                  <td className="w-[5%] text-center py-2 px-4">
                    #{index + 1 + limit}
                  </td>
                  <td className="w-[10%] text-center py-2 px-4">
                    <img
                      src={`http://localhost:3000/${item.imgUrl}`}
                      alt="logo"
                      className="w-[70px] h-[70px] m-auto rounded object-cover"
                    />
                  </td>
                  <td className="w-[20%] text-center py-2 px-4 truncate">
                    {item.title}
                  </td>
                  <td className="w-[15%] text-center py-2 px-4 truncate">
                    {item.desc}
                  </td>
                  <td className="w-[20%] text-center py-2 px-4 truncate">
                    {item.content}
                  </td>
                  <td className="w-[10%] text-center py-2 px-4">
                    <div className="flex items-center justify-center gap-5">
                      <Link
                        to={`/quan-ly-tin-tuc/chinh-sua-tin-tuc/${item._id}`}
                        className="bg-yellow-500 p-2 rounded text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteItemBlog(item._id)}
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

export default ListBlogs;
