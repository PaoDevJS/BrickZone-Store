import { useEffect, useState } from "react";

const ListTopDashboard = ({ orders, users }) => {
  const [total, setTotal] = useState("");
  const money = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    const totalAmount = orders?.reduce(
      (sum, item) => sum + Number(item.totalAmount),
      0
    );
    setTotal(totalAmount);
  }, [orders]);
  return (
    <div className="grid grid-cols-12 gap-15">
      <div className="col-span-3 w-full m-auto rounded-md p-5 text-center bg-green-600 text-white">
        <h3>Tổng doanh thu</h3>
        <p className="text-3xl font-[700] mt-5">{money.format(total)}</p>
      </div>
      <div className="col-span-3 w-full m-auto rounded-md p-5 text-center bg-blue-600 text-white">
        <h3 className="text-[16px]">Số lượng đơn hàng</h3>
        <p className="text-3xl font-[700] mt-5">{orders?.length}</p>
      </div>
      <div className="col-span-3 w-full m-auto rounded-md p-5 text-center bg-pink-600 text-white">
        <h3 className="text-[16px]">Số khách hàng</h3>
        <p className="text-3xl font-[700] mt-5">{users?.length}</p>
      </div>
      <div className="col-span-3 w-full m-auto rounded-md p-5 text-center bg-violet-600 text-white">
        <h3 className="text-[16px]">Số khách hàng</h3>
        <p className="text-3xl font-[700] mt-5">{users?.length}</p>
      </div>
    </div>
  );
};

export default ListTopDashboard;
