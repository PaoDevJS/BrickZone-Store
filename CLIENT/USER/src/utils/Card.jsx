import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ product }) => {
  const money = Intl.NumberFormat("vi-Vn", {
    style: "currency",
    currency: "VND",
  });
  const linkUrlApiAddProductItemToCart =
    "http://localhost:3000/api/v1/cart/product-add-to-cart";

  const handleAddProductItemToCart = async (product_id) => {
    try {
      const result = await axios.post(
        linkUrlApiAddProductItemToCart,
        { product_id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success(result.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div
      key={product._id}
      className="border border-gray-300 max-w-[260px] max-h-[350px] rounded-md p-5 flex flex-col gap-3 col-span-3 group"
    >
      <div className="w-full max-h-[50%] rounded-md overflow-hidden">
        <img
          src={`http://localhost:3000/${product.imgUrl[0]}`}
          alt="Ảnh sản phẩm"
          className="w-full h-full group-hover:scale-110 object-cover transition-all ease-in"
        />
      </div>
      <Link
        to={`/cua-hang/san-pham/${JSON.stringify(product.name)}/${product._id}`}
        className="text-[16px] font-[600] line-clamp-2"
      >
        {product.name}
      </Link>
      <h3 className="text-[20px] font-[700] text-Primary">
        {money.format(product.price)}
      </h3>
      {localStorage.getItem("accessToken") ? (
        <button
          onClick={() => handleAddProductItemToCart(product._id)}
          className="bg-Primary rounded-full text-[16px] py-2 font-[600] text-white cursor-pointer hover:scale-95 transition-all duration-200 ease-linear"
        >
          Thêm vào giỏ hàng
        </button>
      ) : (
        <Link
          to={`/dang-nhap`}
          className="bg-Primary rounded-full text-[16px] text-center py-2 font-[600] text-white cursor-pointer hover:scale-95 transition-all duration-200 ease-linear"
        >
          Thêm vào giỏ hàng
        </Link>
      )}
    </div>
  );
};

export default Card;
