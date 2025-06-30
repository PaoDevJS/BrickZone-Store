import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderTop from "../components/HeaderTop";

const LayoutSingInAndSingUp = () => {
  return (
    <>
      <HeaderTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutSingInAndSingUp;
