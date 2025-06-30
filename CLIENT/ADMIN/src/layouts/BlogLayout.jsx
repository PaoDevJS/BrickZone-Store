import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="w-full h-full p-10">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
