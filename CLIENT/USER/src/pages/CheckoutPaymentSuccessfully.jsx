import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutPaymentSuccessfully = () => {
  const { id } = useParams();
  return (
    <div className="m-auto container flex flex-col gap-10 my-10 px-10">
      <div className="w-full min-h-[70vh] flex justify-center items-center shadow-lg shadow-Gray/30 border border-gray-100 rounded-md">
        <div className="w-[60%] bg-white p-10 rounded-md">
          <div className="pb-5 border-b-2 border-gray-200">
            <FaCheckCircle size={70} className="m-auto text-green-600" />
            <h2 className="text-2xl uppercase text-center text-red-500 mt-3 font-[700]">
              Đặt hàng thành công
            </h2>
          </div>
          <ul className="py-5 px-2 text-center w-[50%] m-auto">
            <li>
              <p>Cảm ơn bạn đã đặt hàng tại:</p>
              <p className="font-[600] text-[16px] mt-2">
                BRICKONZE STORE - Chuyên mô hình LEGO
              </p>
            </li>
            <li className="bg-red-500 rounded p-3 text-white my-5">
              <p className="text-[16px]">Mã đơn hàng của bạn là:</p>
              <p className="font-[600] text-[18px] mt-2">{id}</p>
            </li>
            <li className="flex flex-col gap-2">
              <p>
                Khi đơn hàng đã được xác nhận và xuất kho, một số yêu cầu hủy
                đơn hàng sẽ không được thực hiện trên hệ thông.
              </p>
              <p>
                Nếu quý khách có thắc mắc gì, xin vui lòng liên hệ với chúng tôi
                qua số Hotline:{" "}
              </p>
              <p className="text-[16px] font-[600] text-red-600">0981058326</p>
              <p>Xin chân thành cảm ơn quý khách!</p>
            </li>
          </ul>
          <div className="pt-7 border-t-2 border-gray-200 flex items-center justify-center gap-10">
            <Link
              to={`/cua-hang`}
              className="py-3 w-[30%] text-center rounded bg-red-600 text-white text-[16px] font-[600] cursor-pointer border border-red-600 "
            >
              Tiếp tục mua hàng
            </Link>
            <Link className="py-3 w-[30%] rounded text-center text-black text-[16px] font-[600] cursor-pointer border border-gray-300">
              xem đơn hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentSuccessfully;
