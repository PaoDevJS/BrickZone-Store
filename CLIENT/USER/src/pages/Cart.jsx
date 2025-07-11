import ListProductOfCart from "../components/ListProductOfCart";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TotalPayment from "../components/TotalPayment";
import { Link } from "react-router-dom";
import cart from "../assets/images/cart.jpg";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const linkUrlApiCallListCartOfUser =
    "http://localhost:3000/api/v1/cart/get-all-product-cart";
  const linkUrlApiUpdateProductItemToCart =
    "http://localhost:3000/api/v1/cart/update-product-item-to-cart/";
  const linkUrlApiDeleteProductItemToCart =
    "http://localhost:3000/api/v1/cart/delete-product-item-to-cart/";

  const isFetchCallApiToCart = async () => {
    try {
      const result = await axios.get(linkUrlApiCallListCartOfUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProducts(result.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    isFetchCallApiToCart();
  }, []);

  const isFetchApiUpdateProductItemQuanTity = async (product_id, method) => {
    try {
      const result = await axios.put(
        `${linkUrlApiUpdateProductItemToCart}${product_id}`,
        { method },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (result.data?.message === "ok") isFetchCallApiToCart();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleMinusQuantity = async (product_id) => {
    isFetchApiUpdateProductItemQuanTity(product_id, "minus");
  };

  const handlePlusQuantity = (product_id) => {
    isFetchApiUpdateProductItemQuanTity(product_id, "plus");
  };

  const handleRemoveProductInCart = async (product_id) => {
    try {
      const result = await axios.delete(
        `${linkUrlApiDeleteProductItemToCart}${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success(result.data?.message);
      isFetchCallApiToCart();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container m-auto my-15 px-10">
      <div className="flex flex-col gap-10 border border-gray-100 rounded-md shadow-lg shadow-Gray/30 p-10">
        <h1 className="text-2xl px-3 text-gray-700 font-[700] uppercase pb-3 border-b border-gray-300">
          Giỏ hàng
        </h1>
        {products?.products?.length > 0 ? (
          <ListProductOfCart
            products={products}
            handleMinusQuantity={handleMinusQuantity}
            handlePlusQuantity={handlePlusQuantity}
            handleRemoveProductInCart={handleRemoveProductInCart}
          />
        ) : (
          <div className="h-[50vh] flex items-center justify-center flex-col gap-5">
            <img src={cart} alt="" className="object-cover mb-10" />
            <h3 className="font-[600] text-[18px] leading-5">
              Hiện giỏ hàng của bạn không có sản phẩm nào!
            </h3>
            <p className="text-gray-500">
              Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!
            </p>
            <button className="py-3 px-4 hover:bg-black border rounded-md text-[16px] font-[500] hover:text-white transition duration-150 ease-in-out">
              <Link to={"/cua-hang"}>Mua sắm ngày</Link>
            </button>
          </div>
        )}
        <TotalPayment products={products} />
      </div>
    </div>
  );
};

export default Cart;
