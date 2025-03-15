import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import haileopia from "../../assets/profile.png";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      // Apply specific logic for small devices here
      if (window.innerWidth < 1000) {
        // Small device logic - here it forces `isScrolled` to true
        setIsScrolled(true);
      } else {
        // Optionally reset or modify behavior for larger screens
        setIsScrolled(window.scrollY > 0);
      }
    };

    // Initialize on mount
    handleResize();

    // Add event listeners for scroll and resize
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to only run once on mount

  const isLoggedIn = Cookies.get("isLoggedIn");

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("isLoggedIn");
    window.location.reload();
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 min-h-[80px]  ${
        isScrolled ? "bg-white text-gray-800 shadow-md" : "text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/">
          <img
            src={haileopia}
            alt="Haileamlak Waleligne"
            className="h-[70px] w-[70px]"
          />
        </Link>

        <button
          className="lg:hidden focus:outline-none  cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <ul
          className={`lg:flex lg:space-x-8 absolute lg:static top-16 lg:top-0 left-0 w-full lg:w-auto ${
            isScrolled ? "bg-white text-gray-800" : " text-white"
          } p-6 lg:p-0 cursor-pointer items-center ${
            isOpen
              ? "block bg-white text-gray-800 py-10 mt-10 min-h-[50vh]"
              : "hidden"
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
            <li key={item.name} className="p-3 lg:p-0">
              <Link
                to={item.path}
                onClick={closeMenu}
                className={`${
                  isOpen
                    ? "relative  hover:text-blue-400 text-gray-800 hover:underline hover:underline-offset-4"
                    : "relative  hover:text-blue-400 hover:underline hover:underline-offset-4"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {!isLoggedIn && (
            <Link to="/login">
              <button className="bg-green-500 cursor-pointer hover:text-blue-600 hover:underline text-white font-semibold px-8 py-2 rounded-2xl">
                Login
              </button>
            </Link>
          )}

          {isLoggedIn && (
            <div className="flex gap-3">
              <Link to="/write" onClick={closeMenu}>
                <button className="bg-green-500 cursor-pointer hover:text-blue-600 hover:underline text-white font-semibold px-8 py-2 rounded-2xl">
                  Write
                </button>
              </Link>
              <div
                onClick={() => {
                  handleLogout();
                  closeMenu;
                }}
              >
                <button className="bg-red-500 cursor-pointer  hover:underline text-white font-semibold px-8 py-2 rounded-2xl">
                  Logout
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
