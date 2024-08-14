import { useContext } from "react";
import { AppContext } from "../App";
import Follower from "./Follower";

const Following = () => {
  const { following } = useContext(AppContext);
  return (
    <div className="p-3">
      {
        following?.length > 0 && following.map((follower, index) => (
          <Follower key={index} follower={follower} />
        ))
      }
    </div>
  );
};

export default Following;
