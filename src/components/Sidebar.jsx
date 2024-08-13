import { Navbar, Nav } from "react-bootstrap";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ setCurrentPath }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLinkClick = (e, path) => {
    setCurrentPath(path);
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
              onClick={(e) => handleLinkClick(e, "/")}
              className={`d-flex align-items-center text-decoration-none p-2`}
            >
              <FaHome className="me-2" />
              <div>Home</div>
            </Link>

            <Link
              to="/profile"
              onClick={(e) => handleLinkClick(e, "/profile")}
              className={`d-flex align-items-center text-decoration-none p-2`}
            >
              <FaUser className="me-2" />
              <div>Profile</div>
            </Link>

            <Link
              to="/logout"
              onClick={() => handleLinkClick("/logout")}
              className={`d-flex align-items-center text-decoration-none p-2`}
            >
              <FaSignOutAlt className="me-2" />
              <div>Log out</div>
            </Link>
          </Nav>
        </Navbar>
      </div>

      {/* Sidebar for small screens */}
      <div className="d-lg-none">
        <Navbar
          bg="light"
          fixed="bottom"
          className="d-flex justify-content-around p-2 border-top shadow-sm position-fixed bottom-0 start-0 w-100"
        >
          <Nav className="w-100 d-flex justify-content-between">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`text-center flex-grow-1 text-decoration-none p-2 ${
                currentPath === "/" ? "text-primary" : "text-dark"
              }`}
            >
              <FaHome />
            </Link>
            <Link
              to="/profile"
              onClick={() => handleLinkClick("/profile")}
              className={`text-center flex-grow-1 text-decoration-none p-2 ${
                currentPath === "/profile" ? "text-primary" : "text-dark"
              }`}
            >
              <FaUser />
            </Link>
            <Link
              to="/logout"
              onClick={() => handleLinkClick("/logout")}
              className={`text-center flex-grow-1 text-decoration-none p-2 ${
                currentPath === "/logout" ? "text-primary" : "text-dark"
              }`}
            >
              <FaSignOutAlt />
            </Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default Sidebar;
