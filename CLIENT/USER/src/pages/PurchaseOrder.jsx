import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PurchaseOrder = () => {
  const [listOrders, setListOrders] = useState([]);
  const [status, setStatus] = useState("");
  const isFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const linkUrlApiGetAllOrdersOfUser =
    "http://localhost:3000/api/v1/order/get-all-orders-of-user";

  const linkUrlApiUpdateItemOrderOfUser =
    "http://localhost:3000/api/v1/order/update-item-order";

  const isFetchApiGetDate = async () => {
    try {
      const result = await axios.get(linkUrlApiGetAllOrdersOfUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setListOrders(result.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    isFetchApiGetDate();
  }, []);

  const handleUpdateItemOfUser = async (order_id) => {
    try {
      const result = await axios.put(
        `${linkUrlApiUpdateItemOrderOfUser}/${order_id}`,
        { status: "Đã hủy" }
      );
      toast.success(result?.data?.message);
      isFetchApiGetDate();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-[80%] max-h-[150vh] overflow-y-scroll isScroller shadow-lg shadow-Gray/30 rounded-md border-gray-100 border">
      <div className="py-5 px-10 border-b border-gray-300 flex items-center justify-between">
        <h1 className="text-xl font-[600] text-gray-700">Đơn hàng</h1>
        <select
          value={status}
          onChange={(valid) => setStatus(valid.target.value)}
          className="border border-gray-300 outline-none p-2 rounded"
        >
          <option value="">Tất cả </option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
          <option value="Đang giao hàng">Đang vận chuyển</option>
          <option value="Giao thành công">Giao thành công</option>
          <option value="Giao thành công">Giao không thành công</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
      <div className="flex flex-col gap-5 px-10 py-5">
        {listOrders &&
          listOrders
            ?.filter((order) =>
              order.status.toLowerCase().includes(status.toLocaleLowerCase())
            )
            ?.map((order) => (
              <div
                key={order._id}
                className="border rounded-md border-gray-200"
              >
                <div className="border-b border-gray-200 p-5 flex flex-col gap-5">
                  {order?.listProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between gap-10"
                    >
                      <div className="flex items-center gap-3 w-[80%]">
                        <img
                          src={`http://localhost:3000/${product?.product_id?.imgUrl[0]}`}
                          alt=""
                          className="min-w-[100px] h-[100px] rounded"
                        />
                        <div>
                          <h3 className="text-[16px] text-black line-clamp-2 mb-2">
                            {product?.product_id?.name}
                          </h3>
                          <div>
                            <span className="text-gray-600 mr-2">
                              Số lượng:{" "}
                            </span>
                            <span>x {product?.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[15%] text-center font-[500]">
                        <h3>
                          {isFormat.format(
                            product?.quantity * product?.product_id?.price
                          )}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between p-5">
                  <p className="text-gray-700">
                    Đơn hàng sẽ được chuẩn bị và chuyển đi
                  </p>
                  <div>
                    <div>
                      <span className="text-gray-600 mr-2 text-[16px]">
                        Tổng tiền:{" "}
                      </span>
                      <span className="text-xl font-[500] text-Primary">
                        {isFormat.format(order.totalAmount)}
                      </span>
                    </div>
                    {order.status !== "Chờ xử lý" ? (
                      <p className="py-2 px-5 rounded font-[600] cursor-pointer block m-auto mt-5 text-center border border-gray-300 text-gray-600">
                        {order.status}
                      </p>
                    ) : (
                      <button
                        onClick={() => handleUpdateItemOfUser(order._id)}
                        className="bg-Primary py-2 px-5 rounded text-white font-[600] cursor-pointer block m-auto mt-5"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PurchaseOrder;
