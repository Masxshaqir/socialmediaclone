// import { useContext, useState, useEffect } from "react";
// import { FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { AppContext } from "../App";
// import {
//   addFriend,
//   deleteFriend,
//   getAllUsers,
// } from "../services/API/authServices";
// import { Button } from "react-bootstrap";

// const Follower = ({ follower }) => {
//   const { following, setFollowing, setAllUsers } = useContext(AppContext);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     const isFollower = following.some((f) => f?.email === follower?.email);
//     setIsFollowing(isFollower);
//   }, [following, follower]);

//   const handleFollowToggle = async () => {
//     setIsProcessing(true);

//     try {
//       if (isFollowing) {
//         await deleteFriend({ followed_email: follower?.email });
//         setFollowing(following.filter((f) => f?.email !== follower?.email)); // Update state to remove follower
//         const response = await getAllUsers();
//         setAllUsers(response?.result);
//       } else {
//         await addFriend({ followed_email: follower?.email });
//         setFollowing([...following, { email: follower?.email }]); // Update state to add follower
//         const response = await getAllUsers();
//         setAllUsers(response?.result);
//       }
//       setIsFollowing(!isFollowing); // Toggle the following state
//     } catch (error) {
//       console.error("Failed to update follow status:", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
//       <div className="d-flex align-items-center gap-2">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "40px",
//             height: "40px",
//             borderRadius: "50%",
//             border: "1px solid #ccc",
//           }}
//         >
//           <FaUser size={20} />
//         </div>
//         <div className="d-flex flex-column justify-content-start align-items-start">
//           <Link to={`/profile/${follower?.email}`} className="default-link">
//           {follower?.first_name && follower?.last_name
//               ? `${follower?.first_name} ${follower?.last_name}`
//               : "Loading..."}
//           </Link>
//           <small className="text-muted">{follower?.email}</small>
//         </div>
//       </div>
//       <Button
//         variant="link"
//         className="text-muted p-0 text-black"
//         onClick={handleFollowToggle}
//         disabled={isProcessing}
//       >
//         {isFollowing ? "Unfollow" : "Follow"}
//       </Button>
//     </div>
//   );
// };

// export default Follower;

import React,{ useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import {
  addFriend,
  deleteFriend,
  getAllUsers,
} from "../services/API/authServices";
import { Button } from "react-bootstrap";

const Follower = React.memo(({ follower }) => {
  const { following, setFollowing, setAllUsers } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (follower) {
      const isFollower = following.some((f) => f?.email === follower?.email);
      setIsFollowing(isFollower);
    }
  }, [following, follower]);

  const handleFollowToggle = async () => {
    setIsProcessing(true);

    try {
      if (isFollowing) {
        // Wait until the unfollow action is successful before updating state
        await deleteFriend({ followed_email: follower?.email });
        setFollowing(following.filter((f) => f?.email !== follower?.email));
        setIsFollowing(false); // Update following status after successful unfollow
      } else {
        // Wait until the follow action is successful before updating state
        await addFriend({ followed_email: follower?.email });
        setFollowing([...following, follower]); // Ensure full follower object is added
        setIsFollowing(true); // Update following status after successful follow
      }

      // Fetch and update the list of all users after follow/unfollow
      const response = await getAllUsers();
      setAllUsers(response?.result);
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
            {follower?.first_name && follower?.last_name
              ? `${follower?.first_name} ${follower?.last_name}`
              : "Loading..."}
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
        {isProcessing ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
});

export default Follower;

