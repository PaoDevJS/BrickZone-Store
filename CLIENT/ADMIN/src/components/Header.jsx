import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 bg-white h-[10%] w-[80%] z-40 flex items-center justify-between px-10 shadow-md">
      <h1 className="FontCherry text-5xl text-RedDrank">Brickzone</h1>
      <div>
        <Link
          to={`http://localhost:5173`}
          className="bg-RedDrank rounded-full py-2 px-5 text-white font-[600] underline"
        >
          Đến website
        </Link>
      </div>
    </header>
  );
};

export default Header;
