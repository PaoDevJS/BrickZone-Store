import { FaSearch, FaEdit, FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import axios from "axios";
import ViewDetailOrder from "../components/ViewDetailOrder";
import UpdateItemOrder from "../components/UpdateItemOrder";

const Order = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [status, setStatus] = useState("");
  const [viewDetail, setViewDetail] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const count = 5;

  const money = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handlePrevious = () => {
    if (page <= 1 && limit <= 0) return;

    setPage((p) => p - 1);
    setLimit((p) => p - count);
  };

  const handleNext = () => {
    if (orders.length < limit || orders.length <= count * page) return;

    setPage((p) => p + 1);
    setLimit((p) => p + count);
  };

  const linkUrlApiGetAllOrders =
    "http://localhost:3000/api/v1/order/get-all-orders";
  const isFetchApiGetDate = async () => {
    try {
      const result = await axios.get(linkUrlApiGetAllOrders);
      setOrders(result.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    isFetchApiGetDate();
  }, []);

  return (
    <>
      <div className="w-full h-full p-10">
        <h1 className="text-xl font-[700] uppercase">Danh sách đơn hàng</h1>
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-3 items-center border w-[50%] p-3 my-5 rounded-md border-gray-300">
            <FaSearch size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(valid) => setSearch(valid.target.value)}
              placeholder="Tìm kiếm sản phẩm tại đây..."
              className="w-full outline-none placeholder:font-[600]"
            />
          </div>
          <div>
            <select
              name=""
              id=""
              value={status}
              onChange={(valid) => setStatus(valid.target.value)}
              className="border border-gray-300 rounded-md p-2 outline-none"
            >
              <option value="">Tất cả</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Giao thành công">Giao thành công</option>
              <option value="Giao thành công">Giao thất bại</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
        </div>
        <table className="table-fixed w-full rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-RedDrank text-white">
              <th className="w-[15%] px-4 p-2 border-r">Mã đơn</th>
              <th className="w-[15%] px-4 p-2 border-r">Ngày đặt</th>
              <th className="w-[15%] px-4 p-2 border-r">Người Nhận</th>
              <th className="w-[15%] px-4 p-2 border-r">Trạng thái đơn hàng</th>
              <th className="w-[15%] px-4 p-2 border-r">Thanh toán</th>
              <th className="w-[15%] px-4 p-2 border-r">Tổng tiền</th>
              <th className="w-[10%] px-4 p-2 border-r">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders
                .filter(
                  (order) =>
                    order.status
                      .toLowerCase()
                      .includes(status.toLocaleLowerCase()) &&
                    order._id
                      .toString()
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())
                )
                .map((item) => (
                  <tr
                    key={item._id}
                    className="odd:bg-[#e7e7e9] even:bg-[#fdfdfd]"
                  >
                    <td className="text-center py-3 truncate">{item._id}</td>
                    <td className="text-center py-3 truncate">
                      {item.orderTimer}
                    </td>
                    <td className="text-center py-3 truncate">
                      {item?.address?.fullname}
                    </td>
                    <td className="text-center py-3 truncate">{item.status}</td>
                    <td className="text-center py-3 truncate">
                      {item.paymentStatus}
                    </td>
                    <td className="text-center py-3 truncate">
                      {money.format(item.totalAmount)}
                    </td>
                    <td className="text-center py-3 truncate">
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={() => (
                            setViewDetail(true), setOrderId(item._id)
                          )}
                          className="bg-violet-500 p-2 rounded text-white cursor-pointer"
                        >
                          <FaRegEye size={18} />
                        </button>
                        <button
                          onClick={() => (
                            setUpdateOrder(true), setOrderId(item._id)
                          )}
                          disabled={(["Giao thành công", "Giao không thành công", "Đã hủy"].includes(item.status) ? true : false)}
                          className="bg-yellow-500 p-2 rounded text-white cursor-pointer"
                        >
                          <FaEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-3 mt-7">
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

      {viewDetail ? (
        <ViewDetailOrder
          setViewDetail={setViewDetail}
          orderId={orderId}
          setOrderId={setOrderId}
          isFetchApiGetDate={isFetchApiGetDate}
        />
      ) : null}

      {updateOrder ? (
        <UpdateItemOrder
          isFetchApiGetDate={isFetchApiGetDate}
          orderId={orderId}
          setOrderId={setOrderId}
          setUpdateOrder={setUpdateOrder}
        />
      ) : null}
    </>
  );
};

export default Order;
