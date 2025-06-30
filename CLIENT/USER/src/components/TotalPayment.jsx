import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TotalPayment = ({ products }) => {
  const [monies, setMonies] = useState("");
  const total = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    const isListMonies = products?.products?.map(
      (item) => item?.product_id?.price * item?.quantity
    );
    const isTotalMonies = isListMonies?.reduce((init, item) => init + item, 0);
    setMonies(isTotalMonies);
  }, [products]);

  return (
    <div className="bg-white rounded-md py-5 px-10 flex items-center justify-between">
      <h3>
        <span className="text-gray-500 text-[16px]">
          Số lượng sản phẩm đã chọn:
        </span>
        <span className="ml-3 font-[600] text-[16px]">
          {products?.products?.length || 0} sản phẩm
        </span>
      </h3>
      <div className="flex items-center gap-10">
        <div>
          <h2 className="text-center">
            <span className="text-[16px] text-gray-600">Tổng tiền hàng:</span>
            <span className="ml-3 text-2xl text-Primary font-[700]">
              {total.format(monies ? monies : 0)}
            </span>
          </h2>
          <p className="mt-2 text-yellow-500">
            Lựa chọn mã giảm giá có thể tìm thấy ở trang Thanh Toán
          </p>
        </div>
        <Link
          to={`/thanh-toan/${products?._id}`}
          className="bg-Primary py-3 px-10 rounded-md text-lg font-[500] text-white cursor-pointer hover:bg-Primary/85 transition-all duration-300 ease-in"
        >
          Mua hàng
        </Link>
      </div>
    </div>
  );
};

export default TotalPayment;
