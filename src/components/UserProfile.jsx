import { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Posts from "./Posts";
import { AppContext } from "../App";
import {
  addFriend,
  deleteFriend,
  getProfile,
} from "../services/API/authServices";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();

  const { userData, following, setFollowing, setUserData } =
    useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        const response = await getProfile({
          email: id,
        });
        if (response?.result) {
          setUserData(response?.result);
        }
      } catch (error) {
        console.error("Failed to get user profile data:", error);
      }
    };

    getUserProfileData();
  }, [id]);

  useEffect(() => {
    const isFollower = following.some(
      (follower) => follower?.email === userData?.email
    );
    setIsFollowing(isFollower);
  }, [following, userData?.email]);

  const handleFollowToggle = async () => {
    setIsProcessing(true);

    try {
      if (isFollowing) {
        await deleteFriend({ followed_email: userData?.email });
        setFollowing(following.filter((f) => f?.email !== userData?.email)); // Update state to remove follower
      } else {
        await addFriend({ followed_email: userData?.email });
        setFollowing([...following, { email: userData?.email }]); // Update state to add follower
      }
      setIsFollowing(!isFollowing); // Toggle the following state
    } catch (error) {
      console.error("Failed to update follow status:", error);
    } finally {
      setIsProcessing(false);
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
          className="btn rounded-pill btn-outline-secondary border-lightgray"
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
