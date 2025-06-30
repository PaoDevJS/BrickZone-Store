import { Outlet } from "react-router-dom";
import SideBarUser from "../components/SideBarUser";
const LayoutUser = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="container m-auto my-10 2xl:px-0 px-10 flex gap-10">
      <SideBarUser user={user} />
      <Outlet user={user}/>
    </div>
  );
};

export default LayoutUser;
