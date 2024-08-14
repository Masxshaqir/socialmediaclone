import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import Posts from "./Posts";
import { AppContext } from "../App";
import { addFriend } from "../services/API/authServices";

const UserProfile = () => {
  const { userData } = useContext(AppContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // For disabling the button during API call

  const handleFollowToggle = async () => {
    setIsProcessing(true); // Disable the button during the API call

    try {
      if (isFollowing) {
        // If already following, unfollow the user
        // await removeFriend({
        //   followed_email: userData?.email,
        // });
        // setIsFollowing(false);
      } else {
        // If not following, follow the user
        await addFriend({
          followed_email: userData?.email,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Failed to update follow status:", error);
    } finally {
      setIsProcessing(false); // Re-enable the button after the API call
    }
  };

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
      <div className="d-flex justify-content-end mt-2 px-3">
        <button
          type="button"
          className={`btn rounded-pill ${isFollowing ? "btn-secondary" : "btn-outline-secondary"} border-lightgray`}
          onClick={handleFollowToggle}
          disabled={isProcessing}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="d-flex flex-column px-3 mt-2">
        <b>{`${userData?.first_name}`}</b>
        <small className="text-muted">{userData?.email}</small>
      </div>
      <Posts />
    </div>
  );
};

export default UserProfile;
