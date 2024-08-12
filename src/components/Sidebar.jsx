import { Navbar, Nav } from "react-bootstrap";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar for large screens */}
      <div className="d-none d-lg-block">
        <Navbar
          bg="light"
          className="flex-column vh-100 p-3 position-fixed top-0 bottom-0 start-0"
          style={{ width: '250px' }}
        >
          <Nav className="flex-column">
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none text-dark p-2"
            >
              <FaHome className="me-2" />
              <div>Home</div>
            </Link>

            <Link
              to="/profile"
              className="d-flex align-items-center text-decoration-none text-dark p-2"
            >
              <FaUser className="me-2" />
              <div>Profile</div>
            </Link>

            <Link
              to="/logout"
              className="d-flex align-items-center text-decoration-none text-dark p-2"
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
              className="text-center flex-grow-1 text-decoration-none text-dark p-2"
            >
              <FaHome />
            </Link>
            <Link
              to="/profile"
              className="text-center flex-grow-1 text-decoration-none text-dark p-2"
            >
              <FaUser />
            </Link>
            <Link
              to="/logout"
              className="text-center flex-grow-1 text-decoration-none text-dark p-2"
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
