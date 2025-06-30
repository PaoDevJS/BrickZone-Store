import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessTokenAdmin");
    if (!accessToken) {
      navigate("/dang-nhap");
    }
  }, [navigate]);

  return (
    <div className="w-full h-[100vh] flex ">
      <div className="w-[20%] border h-full">
        <SideBar />
      </div>
      <div className="w-[80%] h-full">
        <div className="h-[10%] w-full">
          <Header />
        </div>
        <div className="h-[90%] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
