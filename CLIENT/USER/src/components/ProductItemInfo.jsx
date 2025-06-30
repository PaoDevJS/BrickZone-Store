import axios from "axios";
import { toast } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

const ProductItemInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const money = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const linkUrlApiAddProductItemToCart =
    "http://localhost:3000/api/v1/cart/product-add-to-cart";
  const handleAddProductItemToCart = async (product_id) => {
    try {
      const result = await axios.post(
        linkUrlApiAddProductItemToCart,
        { product_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success(result.data?.message);
      setQuantity(1);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const handlePlusQuantity = () => {
    setQuantity((p) => p + 1);
  };
  const handleMinusQuantity = () => {
    if (quantity === 1) return;

    setQuantity((p) => p - 1);
  };
  return (
    <div className="w-[40%] max-h-full px-3 flex flex-col gap-3">
      <h1 className="text-xl font-[600]">{product?.name}</h1>
      <h3 className="text-gray-700">
        Giá bán:
        <span className="text-xl font-[600] text-Primary ml-5">
          {money.format(product?.price)}
        </span>
      </h3>
      <ul>
        <li className="text-[#111]/70 text-[15px]">- Hàng chính hãng</li>
        <li className="text-[#111]/70 text-[15px]">
          - Miễn phí giao hàng toàn quốc đơn trên 500k
        </li>
        <li className="text-[#111]/70 text-[15px]">
          - Giao hàng hỏa tốc 4 tiếng
        </li>
      </ul>
      <div>
        <h3 className="text-[16px] font-[600]">Số lượng:</h3>
        <div className="flex gap-3 items-center mt-3">
          <button
            onClick={handleMinusQuantity}
            className="hover:bg-gray-200 transition-all duration-300 ease-linear cursor-pointer p-1 rounded-full"
          >
            <FaMinus />
          </button>
          <input
            type="text"
            onChange={(valid) => setQuantity(valid.target.value)}
            value={quantity}
            className="border border-gray-300 rounded p-2 w-[100px] font-[600] text-center outline-none"
          />
          <button
            onClick={handlePlusQuantity}
            className="hover:bg-gray-200 transition-all duration-300 ease-in cursor-pointer p-1 rounded-full"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <button
        onClick={() => handleAddProductItemToCart(product?._id)}
        className="bg-Primary mt-5 rounded-md py-2 text-lg font-[600] text-white cursor-pointer hover:bg-Primary/85 transition-all duration-300 ease-in"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductItemInfo;
