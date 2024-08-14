import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";
import { GiHummingbird } from "react-icons/gi";
import { RiArrowGoBackLine } from "react-icons/ri";

const Header = () => {
  const { setCurrentPath, userData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    // Update currentPath whenever the location changes
    setCurrentPath(location.pathname);
  }, [location, setCurrentPath]);

  return (
    <div className="custom-header d-flex align-items-center justify-content-between p-3 border-bottom border-1 border-lightgray">
      <div>
        {location.pathname === "/"
          ? "Home"
          : `${userData?.first_name} ${userData?.last_name}`}
      </div>
      <GiHummingbird style={{ color: "#0d6efd", fontSize: "32px" }} />
      <RiArrowGoBackLine />
    </div>
  );
};

export default Header;
