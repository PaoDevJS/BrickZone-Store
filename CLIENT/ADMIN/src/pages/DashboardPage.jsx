import { useState, useEffect } from "react";
import axios from "axios";
import BarChartOrder from "../components/BarChartOrder";
import ListOrderDashboard from "../components/ListOrderDashboard";
import ListTopDashboard from "../components/ListTopDashboard";
import LineChartTotalAmount from "../components/LineChartTotalAmount";

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const linkUrlApiListOrders =
    "http://localhost:3000/api/v1/order/get-all-orders";
  const linkUrlApiListUsers = "http://localhost:3000/api/v1/user/get-all-users";

  useEffect(() => {
    const isFetchApiDate = async () => {
      try {
        const [orders, users] = await Promise.all([
          axios.get(linkUrlApiListOrders),
          axios.get(linkUrlApiListUsers),
        ]);
        setOrders(orders?.data);
        setUsers(users?.data?.users);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    isFetchApiDate();
  }, []);

  return (
    <div className="w-full h-full p-10 overflow-y-scroll Scroller">
      <h1></h1>
      <ListTopDashboard orders={orders} users={users} />
      <div className="mt-15 grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <BarChartOrder />
          <LineChartTotalAmount />
        </div>
        <ListOrderDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
