import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="text-white py-12 mt-20 shadow-xl border-t-[1px] border-gray-600 w-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4">
              Haileopia Blog
            </h2>
            <div className="flex flex-col gap-4 items-start md:flex-row overflow-x-auto whitespace-nowrap space-x-6 px-4 py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <Link
                to="/"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/technology"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Technology
              </Link>
              <Link
                to="/leadership"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Leadership
              </Link>
              <Link
                to="/productivity"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Productivity
              </Link>
              <Link
                to="/creativity"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Creativity
              </Link>
              <Link
                to="/growth"
                className="text-white hover:text-indigo-600 transition-all duration-300"
              >
                Growth
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-600 transition-all duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-600 transition-all duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-600 transition-all duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-600 transition-all duration-300"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Haileopia Blog. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
