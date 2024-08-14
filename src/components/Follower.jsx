import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProfile } from "../services/API/authServices";
import { AppContext } from "../App";

const Follower = ({ follower }) => {
  const { setUserData } = useContext(AppContext);

  const getUserProfileData = async () => {
    try {
      const response = await getProfile({
        email: follower?.email,
      });
      if (response?.result) {
        setUserData(response.result);
      }
    } catch (error) {
      console.error("Failed to get user profile data:", error);
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        <FaUser size={20} />
      </div>
      <div className="d-flex flex-column justify-content-start align-items-start">
        <Link
          to={`/profile/${follower?.first_name}`}
          onClick={getUserProfileData}
        >
          {`${follower?.first_name} ${follower?.last_name}`}
        </Link>
        <small className="text-muted">{follower?.email}</small>
      </div>
    </div>
  );
};

export default Follower;
