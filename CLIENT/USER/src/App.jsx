import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import InfoBlog from "./pages/InfoBlog";
import DetailProductItem from "./components/DetailProductItem";
import Header from "./components/Header";
import LayoutSingInAndSingUp from "./Layouts/LayoutSingInAndSingUp";
import UserInfo from "./pages/UserInfo";
import PurchaseOrder from "./pages/PurchaseOrder";
import LayoutUser from "./Layouts/LayoutUser";
import RestorePassword from "./pages/RestorePassword";
import ChangePassword from "./components/ChangePassword";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import CheckoutPaymentSuccessfully from "./pages/CheckoutPaymentSuccessfully";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cua-hang" element={<Store />} />
        <Route path="/cua-hang/tim-kiem/:key" element={<Store />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/gioi-thieu" element={<AboutUs />} />
        <Route path="/tin-tuc" element={<Blog />} />
        <Route path="/tin-tuc/:title/:id" element={<InfoBlog />} />
        <Route path="/bo-suu-tap" element={<Collection />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/thanh-toan/:id" element={<Checkout />} />
        <Route path="/cua-hang/san-pham/:title/:id" element={<DetailProductItem />} />
        <Route path="/nguoi-dung" element={<LayoutUser />}>
          <Route path="/nguoi-dung/ho-so-ca-nhan/:id" element={<UserInfo />} />
          <Route path="/nguoi-dung/don-hang" element={<PurchaseOrder />} />
          <Route path="/nguoi-dung/cap-nhap-mat-khau" element={<ChangePassword />} />
          <Route path="/nguoi-dung/dia-chi" element={<Address />} />
        </Route>
      </Route>
      <Route element={<LayoutSingInAndSingUp />}>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/thanh-toan-thanh-cong/:id" element={<CheckoutPaymentSuccessfully />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/khoi-phuc-mat-khau" element={<RestorePassword />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
