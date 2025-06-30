import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <div className="w-full h-full p-10">
        <Outlet />
    </div>
  )
}

export default UserLayout