import { useEffect, useContext } from "react";
import Follower from "./Follower";
import { getAllUsers } from "../services/API/authServices";
import { AppContext } from "../App";

const Followers = () => {
  const { allUsers, setAllUsers } = useContext(AppContext);

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setAllUsers(response?.result);
    } catch (error) {
      console.error("Failed to get all users:", error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);
  return (
    <>
      <div
        className="d-none d-lg-block position-fixed top-0 bottom-0 end-0 p-2 text-center vh-100 border-start border-1 border-lightgray"
        style={{ width: "300px" }}
      >
        <div className="flex-column">
          <h5>Followers</h5>
          {allUsers.length > 0 &&
            allUsers.map((follower, index) => (
              <Follower key={index} follower={follower} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Followers;
