import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [search, setSearch] = useState("");

  const money = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const linkUrlApiGetAllProducts =
    "http://localhost:3000/api/v1/product/get-all-product";
  const linkUrlApiDeleteItemProduct = `http://localhost:3000/api/v1/product/delete-item-product/`;
  const count = 4;

  const fetchApiDataToServer = async () => {
    try {
      const result = await axios.get(linkUrlApiGetAllProducts);
      setProducts(result.data.products);
    } catch (error) {
      console.log(error.response.data.message);
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
    if (products.length < limit || products.length <= count * page) return;

    setPage((p) => p + 1);
    setLimit((p) => p + count);
  };

  const handleDeleteItemProduct = async (id) => {
    try {
      const result = await axios.delete(`${linkUrlApiDeleteItemProduct}${id}`);
      toast.success(result.data.message);
      fetchApiDataToServer();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-[700] uppercase">Danh sách sản phẩm</h1>
        <Link
          to={"/quan-ly-san-pham/them-san-pham-moi"}
          className="flex items-center gap-3 bg-RedDrank/95 rounded-md p-3 text-white "
        >
          <FaPlus size={16} />
          <span className="text-[16px] font-[600]">Thêm sản phẩm</span>
        </Link>
      </div>
      <div className="flex gap-3 items-center border w-[50%] p-3 my-5 rounded-md border-gray-300">
        <FaSearch size={18} className="text-gray-500" />
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm sản phẩm tại đây..."
          className="w-full outline-none placeholder:font-[600]"
          onChange={(vail) => setSearch(vail.target.value)}
        />
      </div>
      <div className="h-[80%] flex flex-col justify-between">
        <table className="table-fixed w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-RedDrank text-white ">
              <th className="w-[5%] text-center border py-2 uppercase">STT</th>
              <th className="w-[15%] text-center border py-2 uppercase">Ảnh</th>
              <th className="w-[15%] text-center border py-2 uppercase">
                Mã sản phẩm
              </th>
              <th className="w-[20%] text-center border py-2 uppercase">
                Tên sản phẩm
              </th>
              <th className="w-[15%] text-center border py-2 uppercase">Giá</th>
              <th className="w-[10%] text-center border py-2 uppercase">
                Số lượng
              </th>
              <th className="w-[10%] text-center border py-2 uppercase">
                trạng thái
              </th>
              <th className="w-[10%] text-center border py-2 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.code_product.toLowerCase().includes(search.toLowerCase())
              )
              .slice(limit, page * count)
              .map((item, index) => (
                <tr key={index} className="odd:bg-[#e7e7e9] even:bg-[#fdfdfd]">
                  <td className="text-center py-2 px-4">
                    #{index + 1 + limit}
                  </td>
                  <td className="text-center py-2 px-4">
                    <img
                      src={`http://localhost:3000/${item.imgUrl[0]}`}
                      alt="Ảnh sản phẩm"
                      className="rounded-md border-gray-200 max-w-[80px] max-h-[80] m-auto object-cover"
                    />
                  </td>
                  <td className="text-center py-2 px-4">{item.code_product}</td>

                  <td
                    title={item.name}
                    className="text-center py-2 px-4 truncate"
                  >
                    {item.name}
                  </td>
                  <td className="text-center py-2 px-4 whitespace-nowrap truncate">
                    {money.format(item.price)}
                  </td>
                  <td className="text-center py-2 px-4 whitespace-nowrap truncate">
                    {item.stock}
                  </td>
                  <td className="text-center py-2 px-4 whitespace-nowrap truncate">
                    {item.status}
                  </td>
                  <td className="text-center py-2 px-4">
                    <div className="flex items-center justify-center gap-5">
                      <Link
                        to={`/quan-ly-san-pham/chin-sua-san-pham/${item._id}`}
                        className="bg-yellow-500 p-2 rounded text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteItemProduct(item._id)}
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

export default ListProducts;
