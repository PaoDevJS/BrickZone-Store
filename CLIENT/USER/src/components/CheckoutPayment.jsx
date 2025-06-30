import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPayment = ({ totalAmount, infoUser, listProducts }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const total = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const newProduct = listProducts.map((item) => ({
      product_id: item.product_id._id,
      quantity: item.quantity,
    }));
    setProducts(newProduct);
  }, [listProducts]);

  const linkUrlApiCheckoutPayment =
    "http://localhost:3000/api/v1/order/payment/create-order-payment";
  const { id } = useParams();
  const handleCheckoutPayment = async () => {
    try {
      const result = await axios.post(
        linkUrlApiCheckoutPayment,
        { totalAmount, infoUser, paymentMethod, products, cart_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if(result.data?.paymentMethod === "MOMO") {
        location.href = result.data?.payUrl
      } else if(result.data?.paymentMethod === "COD") {
        toast.success(result.data?.message)
        navigate(`/thanh-toan-thanh-cong/${result.data?.order_id}`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="border rounded-md border-gray-200">
      <div className="border-b border-gray-300 py-7 px-10">
        <h1 className="font-[500] text-gray-600 text-lg">
          Phương thức thanh toán:
        </h1>
        <div className="mt-5 ml-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="v1"
              id="cod"
              value={"COD"}
              onChange={(valid) => setPaymentMethod(valid.target.value)}
            />
            <label
              htmlFor="cod"
              className="text-[16px] cursor-pointer text-gray-600"
            >
              Thanh toán khi nhận hàng
            </label>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input
              type="radio"
              name="v1"
              id="momo"
              value={"MOMO"}
              onChange={(valid) => setPaymentMethod(valid.target.value)}
            />
            <label
              htmlFor="momo"
              className="text-[16px] cursor-pointer text-gray-600"
            >
              Thanh toán qua MOMO
            </label>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 py-7 px-10 flex justify-end">
        <div className="flex flex-col gap-5 text-[16px] text-gray-600 min-w-[25%]">
          <p className="flex items-center justify-between gap-5">
            Tổng tiền hàng:{" "}
            <span className="font-[500]">{total.format(totalAmount)}</span>
          </p>
          <p className="flex items-center justify-between gap-5">
            Tổng tiền phí vận chuển:{" "}
            <span className="font-[500]">Miễn phí</span>
          </p>
          <p className="flex items-center justify-between gap-5">
            Tổng thanh toán:{" "}
            <span className="text-2xl font-[700] text-Primary">
              {total.format(totalAmount)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between py-7 px-10">
        <p className="text-gray-500">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
          <span className="text-red-500">Điều khoản BrickZone</span>
        </p>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 py-3 w-[200px] rounded text-lg font-[600] cursor-pointer mr-7"
          >
            Quay lại
          </button>
          <button
            onClick={handleCheckoutPayment}
            className="bg-Primary py-3 w-[200px] rounded text-lg font-[600] text-white cursor-pointer"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
