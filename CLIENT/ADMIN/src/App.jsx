import { Route, Routes } from "react-router-dom";
import NotFound404Page from "./pages/NotFound404Page";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import DashboardPage from "./pages/DashboardPage";
import CategoriesLayout from "./layouts/CategoriesLayout";
import ListCategories from "./pages/categoires/ListCategories";
import CreateCategory from "./pages/categoires/CreateCategory";
import UpdateCategory from "./pages/categoires/UpdateCategory";
import SupplierLayout from "./layouts/supplierLayout";
import ListSupplier from "./pages/suppliers/ListSupplier";
import UpdateSupplier from "./pages/suppliers/UpdateSupplier";
import CreateSupplier from "./pages/suppliers/CreateSupplier";
import BlogLayout from "./layouts/BlogLayout";
import NewCreateBlog from "./pages/blog/NewCreateBlog";
import ListBlogs from "./pages/blog/ListBlogs";
import UpdateItemBlog from "./pages/blog/UpdateItemBlog";
import ProductLayout from "./layouts/ProductLayout";
import NewCreateProduct from "./pages/product/NewCreateProduct";
import UpdateItemProduct from "./pages/product/UpdateItemProduct";
import ListProducts from "./pages/product/ListProduct";
import UserLayout from "./layouts/UserLayout";
import NewCreateUser from "./pages/user/NewCreateUser";
import UpdateItemUser from "./pages/user/UpdateItemUser";
import ListUsers from "./pages/user/ListUsers";
import Order from "./pages/Order";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/quan-ly-danh-muc" element={<CategoriesLayout />}>
          <Route
            path="/quan-ly-danh-muc/danh-sach-danh-muc"
            element={<ListCategories />}
          />
          <Route
            path="/quan-ly-danh-muc/tao-danh-muc-moi"
            element={<CreateCategory />}
          />
          <Route
            path="/quan-ly-danh-muc/chinh-sua-danh-muc/:id"
            element={<UpdateCategory />}
          />
        </Route>
        <Route path="/quan-ly-nha-cung-cap" element={<SupplierLayout />}>
          <Route
            path="/quan-ly-nha-cung-cap/danh-sach-nha-cung-cap"
            element={<ListSupplier />}
          />
          <Route
            path="/quan-ly-nha-cung-cap/chinh-sua-nha-cung-cap/:id"
            element={<UpdateSupplier />}
          />
          <Route
            path="/quan-ly-nha-cung-cap/them-nha-cung-cap-moi"
            element={<CreateSupplier />}
          />
        </Route>
        <Route path="/quan-ly-tin-tuc" element={<BlogLayout />}>
          <Route
            path="/quan-ly-tin-tuc/them-tin-tuc-moi"
            element={<NewCreateBlog />}
          />
          <Route
            path="/quan-ly-tin-tuc/danh-sach-tin-tuc"
            element={<ListBlogs />}
          />
          <Route
            path="/quan-ly-tin-tuc/chinh-sua-tin-tuc/:id"
            element={<UpdateItemBlog />}
          />
        </Route>
        <Route path="/quan-ly-san-pham" element={<ProductLayout />}>
          <Route
            path="/quan-ly-san-pham/them-san-pham-moi"
            element={<NewCreateProduct />}
          />
          <Route
            path="/quan-ly-san-pham/danh-sach-san-pham"
            element={<ListProducts />}
          />
          <Route
            path="/quan-ly-san-pham/chin-sua-san-pham/:id"
            element={<UpdateItemProduct />}
          />
        </Route>
        <Route path="/quan-ly-khach-hang" element={<UserLayout />}>
          <Route
            path="/quan-ly-khach-hang/them-khach-hang-moi"
            element={<NewCreateUser />}
          />
          <Route
            path="/quan-ly-khach-hang/chinh-sua-thong-tin-khach-hang/:id"
            element={<UpdateItemUser />}
          />
          <Route
            path="/quan-ly-khach-hang/danh-sach-khach-hang"
            element={<ListUsers />}
          />
        </Route>
        <Route path="/quan-ly-don-hang" element={<Order />}></Route>
      </Route>
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route path="*" element={<NotFound404Page />} />
    </Routes>
  );
};

export default App;
