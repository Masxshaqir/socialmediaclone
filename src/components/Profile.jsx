import { useEffect, useContext, useState } from "react";
import { getProfile, getFollowingUsers } from "../services/API/authServices";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../App";
import Posts from "./Posts";
import Following from "./Following";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  const { setUserData, userEmailInLogin, userData, setFollowing } =
    useContext(AppContext);

  const [activeKey, setActiveKey] = useState("posts");

  const renderTabContent = () => {
    switch (activeKey) {
      case "posts":
        return <Posts />;
      case "following":
        return <Following />;
      default:
        return <Posts />;
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await getProfile({
        email: userEmailInLogin,
      });
      setUserData(response?.result);
    } catch (error) {
      console.error("Failed to get profile data:", error);
    }
  };

  const handleGetFollowingUsers = async () => {
    try {
      const response = await getFollowingUsers();
      setFollowing(response?.result);
    } catch (error) {
      console.error("Failed to get following users:", error);
    }
  };


  useEffect(() => {
    handleGetProfile();
    handleGetFollowingUsers();
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
      <div className="d-flex flex-column px-3" style={{ marginTop: "50px" }}>
        <b>{`${userData?.first_name}`}</b>
        <small className="text-muted">{userData?.email}</small>
      </div>
      <ProfileTabs setActiveKey={setActiveKey} activeKey={activeKey} />
      {/* <Posts /> */}
      <div className="mt-3">{renderTabContent()}</div>
    </div>
  );
};

export default Profile;
