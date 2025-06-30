import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const HeaderTop = () => {
  return (
    <div className="w-full shadow-md shadow-Gray/30 py-5 px-10">
      <div className="container m-auto flex items-center justify-between">
        <Link to={"/"} className="FontCherry text-6xl uppercase text-Primary">
          BrickZone
        </Link>
        <NavBar />
      </div>
    </div>
  );
};

export default HeaderTop;
