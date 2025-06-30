import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateItemOrder = ({
  orderId,
  setOrderId,
  setUpdateOrder,
  isFetchApiGetDate,
}) => {
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState("");

  const linkUrlApiGetItemOrder =
    "http://localhost:3000/api/v1/order/get-item-order";
  const linkUrlApiUpdateItemOrder =
    "http://localhost:3000/api/v1/order/update-item-order";

  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const isFetchApiGetItemOrder = async () => {
      if (!orderId) return;
      try {
        const result = await axios.get(`${linkUrlApiGetItemOrder}/${orderId}`);
        setOrder(result.data);
      } catch (error) {
        console.log(error.response.data?.message);
      }
    };

    isFetchApiGetItemOrder();
  }, [orderId]);

  const handleUpdateItemOrder = async () => {
    try {
      const result = await axios.put(
        `${linkUrlApiUpdateItemOrder}/${orderId}`,
        { status }
      );
      toast.success(result?.data?.message);
      isFetchApiGetDate();
      setUpdateOrder(false);
      setOrderId("")
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className={`fixed top-0 bottom-0 right-0 left-0 bg-black/20 z-50`}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-[90%] max-h-[90%] bg-white rounded-md border border-gray-200 p-10">
          <h1 className="text-center text-xl font-[700] uppercase mb-10">
            Cập nhật trạng thái đơn hàng
          </h1>
          <div className="mt-5 flex gap-5">
            {/* left */}
            <div className="w-[65%]">
              {/* top */}
              <div className="bg-[#f2f2f2] py-2 px-5 rounded flex items-center justify-between border border-gray-300">
                <div>
                  <h3 className="font-[500] text-[16px]">
                    Đơn hàng: {order._id}
                  </h3>
                  <p className="mt-2 text-gray-500">{order.orderTimer}</p>
                </div>
                <div className="bg-green-600 py-2 px-4 rounded-md font-[500] text-white">
                  {order.status}
                </div>
              </div>
              {/* center */}
              <div className="mt-5 flex justify-between">
                <div className="border border-gray-300 w-[40%] rounded-md overflow-hidden">
                  <h1 className="bg-[#f2f2f2] py-2 px-4 uppercase font-[500] text-gray-500">
                    Khách hàng
                  </h1>
                  <div className="py-2 px-4">
                    <h4 className="font-[600] text-[16px]">
                      {order?.user_id?.firstName} {order?.user_id?.lastName}
                    </h4>
                    <p className="text-gray-500">{order?.user_id?.email}</p>
                  </div>
                </div>
                <div className="border border-gray-300 w-[55%] rounded-md overflow-hidden">
                  <h1 className="bg-[#f2f2f2] py-2 px-4 uppercase font-[500] text-gray-500">
                    Người nhận
                  </h1>
                  <div className="py-2 px-4">
                    <h4 className="font-[600] text-[16px]">
                      {order.address?.fullname}
                    </h4>
                    <p className="text-gray-500">{order?.address?.phone}</p>
                    <p className="text-gray-500">{order.address?.address}</p>
                  </div>
                </div>
              </div>
              {/* bottom */}
              <div className="w-full max-h-[550px] mt-5 overflow-y-scroll border border-gray-300 rounded p-3">
                <table className="table-fixed w-full rounded overflow-hidden">
                  <thead>
                    <tr className="bg-red-600 text-white">
                      <th className="py-2 w-[45%]">Tên sản phẩm</th>
                      <th className="py-2 w-[15%]">Số lượng</th>
                      <th className="py-2 w-[20%]">Đơn giá</th>
                      <th className="py-2 w-[20%]">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.listProducts?.map((item, index) => (
                      <tr
                        key={index}
                        className="even:bg-[#fdfdfd] odd:bg-[#e7e7e9]"
                      >
                        <td className="py-3 px-4 truncate text-center">
                          {item.product_id.name}
                        </td>
                        <td className="py-3 px-4 truncate text-center">
                          x{item.quantity}
                        </td>
                        <td className="py-3 px-4 truncate text-center">
                          {formatMoney.format(item.product_id.price)}
                        </td>
                        <td className="py-3 px-4 truncate text-center">
                          {formatMoney.format(
                            item.product_id.price * item.quantity
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* right */}
            <div className="w-[35%] flex flex-col justify-between">
              <div>
                <div className="bg-white border border-gray-300 rounded overflow-hidden text-center">
                  <h3 className="bg-[#f2f2f2] uppercase p-3 font-[500] text-gray-600 border-b border-gray-300">
                    Phương thức thanh toán
                  </h3>
                  <p className="p-3 font-[700] text-pink-600 text-xl">
                    {order.paymentMethod}
                  </p>
                </div>
                <div className="bg-white border border-gray-300 mt-4 p-5 rounded">
                  <div>
                    <div className="flex items-center justify-between text-gray-600 font-[500]">
                      <p>Tạm tính</p>
                      <p className="text-black">
                        {formatMoney.format(order.totalAmount)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 font-[500] my-2">
                      <p>Phí vận chuyển</p>
                      <p className="text-green-600">Miễn phí</p>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 font-[500]">
                      <p>Thành tiền</p>
                      <p className="text-black">
                        {formatMoney.format(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 mt-10 pt-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-[500] text-[18px] text-gray-700">
                          Cần thanh toán
                        </h3>
                        <p className="text-center text-gray-500">
                          ({order?.listProducts?.length || 0} sản phẩm)
                        </p>
                      </div>
                      <h1 className="text-xl font-[600] text-red-700">
                        {formatMoney.format(order.totalAmount)}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-300 mt-4 p-5 rounded">
                  <h2 className="font-[500] text-[16px]">
                    Trạng thái đơn hàng:
                  </h2>
                  <div className="border border-gray-300 mt-3 rounded p-2 flex items-center justify-between gap-5">
                    <h5 className="w-full">{status ? status : order.status}</h5>
                    <select
                      value={status}
                      onChange={(valid) => setStatus(valid.target.value)}
                      className="border border-gray-300 outline-none p-1 rounded"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đang chuẩn bị hàng">
                        Đang chuẩn bị hàng
                      </option>
                      <option value="Đang giao hàng">Đang vận chuyển</option>
                      <option value="Giao thành công">Giao thành công</option>
                      <option value="Giao thành công">
                        Giao không thành công
                      </option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full mt-7 flex flex-col gap-3">
                <button
                  onClick={handleUpdateItemOrder}
                  className="bg-green-600 w-full text-[16px] py-2 rounded font-[600] text-white cursor-pointer"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => (setUpdateOrder(false), setOrderId(""))}
                  className="bg-red-600 w-full text-[16px] py-2 rounded font-[600] text-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemOrder;
