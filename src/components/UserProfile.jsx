import { FaUser } from "react-icons/fa";
import Posts from "./Posts";

const UserProfile = () => {
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

export default UserProfile;
