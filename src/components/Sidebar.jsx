import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { GoSignIn } from "react-icons/go";
import { FiHome, FiUser } from "react-icons/fi";
import { logout } from "../services/API/authServices";
import { AppContext } from "../App";

const Sidebar = () => {
  const location = useLocation();
  const { setToken, setCurrentPath } = useContext(AppContext);
  const currentPath = location.pathname;

  const handleLinkClick = (path) => {
    setCurrentPath(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("currentPath");
      setToken(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="d-none d-lg-block">
        <Navbar
          bg="light"
          className="flex-column vh-100 p-3 position-fixed top-0 bottom-0 start-0 border-end border-1 border-lightgray"
          style={{ width: "250px" }}
        >
          <Nav className="flex-column">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`d-flex align-items-center text-decoration-none p-2 ${
                currentPath === "/" ? "text-black" : "text-black-50"
              }`}
            >
              <FiHome className="me-2" size={20} />
              <div>Home</div>
            </Link>

            <Link
              to="/profile"
              onClick={() => handleLinkClick("/profile")}
              className={`d-flex align-items-center text-decoration-none p-2 ${
                currentPath === "/profile" ? "text-black" : "text-black-50"
              }`}
            >
              <FiUser className="me-2" size={20} />
              <div>Profile</div>
            </Link>

            <div
              onClick={handleLogout}
              role="button"
              className="d-flex align-items-center text-decoration-none p-2 text-black-50"
            >
              <GoSignIn className="me-2" size={20} />
              <div>Log out</div>
            </div>
          </Nav>
        </Navbar>
      </div>

      {/* Sidebar for small screens */}
      <div className="d-lg-none">
        <Navbar
          bg="light"
          fixed="bottom"
          className="d-flex justify-content-around p-2 border-top shadow-lg position-fixed bottom-0 start-0 w-100"
        >
          <Nav className="w-100 d-flex justify-content-between">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`text-center flex-grow-1 text-decoration-none p-2 ${
                currentPath === "/" ? "text-black" : "text-black-50"
              }`}
            >
              <FiHome size={24} />
            </Link>
            <Link
              to="/profile"
              onClick={() => handleLinkClick("/profile")}
              className={`text-center flex-grow-1 text-decoration-none p-2 ${
                currentPath === "/profile" ? "text-black" : "text-black-50"
              }`}
            >
              <FiUser size={24} />
            </Link>
            <div
              onClick={handleLogout}
              role="button"
              className="text-center flex-grow-1 p-2 text-black-50"
            >
              <GoSignIn size={24} />
            </div>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default Sidebar;
