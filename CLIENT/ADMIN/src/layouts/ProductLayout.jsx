import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <div className="w-full h-full p-7">
      <Outlet />
    </div>
  );
};

export default ProductLayout;
