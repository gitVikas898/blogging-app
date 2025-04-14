import { BiArrowToRight, BiBook, BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="flex py-5 border-b container mx-auto items-center justify-around">
      <div id="logo-ct">
        <h1 className="text-4xl font-semibold">
          <Link to="/">Blogr</Link>
        </h1>
      </div>

      <ul className="flex items-center gap-6 text-lg font-medium">
        <li>
          <Link to="/blogs" className="flex items-center gap-1">
            <BiBook /> Read
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className="flex items-center gap-1"><MdDashboard /> Dashboard</Link>
            </li>
            <li>
                <Link to={"/write"} className="flex items-center gap-1"><BiEdit/>Write</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </li>
           
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li className="py-2 px-4 bg-black text-white rounded-full hover:bg-gray-900">
              <Link to="/signup" className="flex items-center gap-1">
                Get Started <BiArrowToRight />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
