import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import haileopia from "../../assets/profile.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-gray-800 bg-white font-light text-sm  fixed w-full z-50 min-h-[80px]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/">
          <img
            src={haileopia}
            alt="Haileamlak Waleligne"
            className="h-[70px] w-[70px]"
          />
        </Link>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <ul
          className={`md:flex md:space-x-8 absolute md:static top-16 md:top-0 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-6 md:p-0 cursor-pointer items-center shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Technology", path: "/technology" },
            { name: "Leadership", path: "/leadership" },
            { name: "Productivity", path: "/productivity" },
            { name: "Creativity", path: "/creativity" },
            { name: "Growth", path: "/growth" },
          ].map((item) => (
            <li key={item.name} className="p-3 md:p-0">
              <Link
                to={item.path}
                className="relative  duration-300 ease-in-out hover:text-blue-400 hover:underline hover:underline-offset-4"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <Link to="/login">
            <button className="bg-green-500 cursor-pointer hover:text-blue-600 hover:underline text-white font-semibold px-8 py-2 rounded-2xl">
              Login
            </button>
          </Link>
          <Link to="/write">
            <button className="bg-green-500 cursor-pointer hover:text-blue-600 hover:underline text-white font-semibold px-8 py-2 rounded-2xl">
              Write
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
