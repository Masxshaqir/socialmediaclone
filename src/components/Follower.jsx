import { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import {
  addFriend,
  deleteFriend,
  getAllUsers,
} from "../services/API/authServices";
import { Button } from "react-bootstrap";

const Follower = ({ follower }) => {
  const { following, setFollowing, setAllUsers } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const isFollower = following.some((f) => f?.email === follower?.email);
    setIsFollowing(isFollower);
  }, [following, follower?.email]);

  const handleFollowToggle = async () => {
    setIsProcessing(true);

    try {
      if (isFollowing) {
        await deleteFriend({ followed_email: follower?.email });
        setFollowing(following.filter((f) => f?.email !== follower?.email)); // Update state to remove follower
        const response = await getAllUsers();
        setAllUsers(response?.result);
      } else {
        await addFriend({ followed_email: follower?.email });
        setFollowing([...following, { email: follower?.email }]); // Update state to add follower
        const response = await getAllUsers();
        setAllUsers(response?.result);
      }
      setIsFollowing(!isFollowing); // Toggle the following state
    } catch (error) {
      console.error("Failed to update follow status:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
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
          <Link to={`/profile/${follower?.email}`} className="default-link">
            {`${follower?.first_name} ${follower?.last_name}`}
          </Link>
          <small className="text-muted">{follower?.email}</small>
        </div>
      </div>
      <Button
        variant="link"
        className="text-muted p-0 text-black"
        onClick={handleFollowToggle}
        disabled={isProcessing}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default Follower;
