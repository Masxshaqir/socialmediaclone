import { useEffect, useContext } from "react";
import { getProfile } from "../services/API/authServices";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../App";
import Posts from "./Posts";

const Profile = () => {
  const { setUserData, userEmailInLogin } = useContext(AppContext);

  const handleGetProfile = async () => {
    try {
      const response = await getProfile({
        email: userEmailInLogin,
      });
      setUserData(response?.result)
    } catch (error) {
      console.error("Failed to get profile data:", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmailInLogin]);

  return (
    <div>
      <div
        className="bg-black w-100 position-relative"
        style={{ height: "180px" }}
      >
        <div className="profile-image-container">
          <div className="profile-image">
            <FaUser size={20} />
          </div>
        </div>
      </div>

      <Posts />
    </div>
  );
};

export default Profile;
