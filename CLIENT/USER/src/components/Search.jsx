import { IoMdCloseCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = ({ show, setShow }) => {
  const navigate = useNavigate();
  const [keySearch, setKeySearch] = useState("");
  const [products, setProducts] = useState([]);
  const handleSearchProduct = () => {
    setShow(false);
    navigate(`/cua-hang/tim-kiem/${JSON.stringify(keySearch)}`);
  };
  const linkUrlApiGetAllProducts =
    "http://localhost:3000/api/v1/product/get-all-product";
  useEffect(() => {
    const isFetchCallApi = async () => {
      try {
        const products = await axios.get(linkUrlApiGetAllProducts);
        setProducts(products.data?.products);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    isFetchCallApi();
  }, []);

  const isFilterProducts = products?.filter(
    (item) =>
      item.categories_id.name.toLowerCase().includes(keySearch.toLowerCase()) &&
      item.name.toLowerCase().includes(keySearch.toLowerCase())
  );

  return (
    <div
      className={`${
        show ? "right-0 opacity-100" : "right-[-100%] opacity-0"
      } w-[100%] fixed top-0 bottom-0 z-50 transition-all ease-in-out duration-500`}
    >
      <div
        className={`w-[40%] h-full bg-white absolute right-0 rounded-md p-7 border-l border-gray-200 shadow-xl shadow-Gray`}
      >
        <button
          onClick={() => setShow(false)}
          className="text-gray-400 hover:text-black cursor-pointer absolute top-4 left-4"
        >
          <IoMdCloseCircle size={25} />
        </button>

        <div className="w-[90%] m-auto flex items-center gap-3 my-7">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm tại đây..."
            value={keySearch}
            onChange={(valid) => setKeySearch(valid.target.value)}
            className="w-full border rounded-md py-2 px-4 outline-red-200 border-gray-300 placeholder:font-[500]"
          />
          <button
            onClick={handleSearchProduct}
            className="bg-Primary text-white py-2 px-4 rounded cursor-pointer"
          >
            <FaSearch size={20} />
          </button>
        </div>

        {keySearch ? (
          <div className="w-full h-[90%] overflow-y-scroll isScroller px-2 flex flex-col gap-5">
            {isFilterProducts.length === 0 ? (
              <p className="text-center text-[16px] text-gray-800 mt-15">Không tìm thấy sản phẩm phù hợp</p>
            ) : (
              isFilterProducts.map((item) => (
                <Link
                  to={`/cua-hang/san-pham/${JSON.stringify(item.name)}/${
                    item._id
                  }`}
                  onClick={() => setShow(false)}
                  key={item._id}
                  className="border flex items-center gap-5"
                >
                  <img
                    src={`http://localhost:3000/${item?.imgUrl[0]}`}
                    alt=""
                    className="w-[100px] h-[100px]"
                  />
                  <h3 className="text-[16px]">{item.name}</h3>
                </Link>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
