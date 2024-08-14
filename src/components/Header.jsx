import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { setCurrentPath, userData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    // Update currentPath whenever the location changes
    setCurrentPath(location.pathname);
  }, [location, setCurrentPath]);

  return (
    <div className="custom-header justify-content-between align-items-center p-3 border-bottom border-1 border-lightgray">
      <div>
        {location.pathname === "/"
          ? "Home"
          : `${userData?.first_name} ${userData?.last_name}`}
      </div>
    </div>
  );
};

export default Header;
