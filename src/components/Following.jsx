// import { useContext } from "react";
// import { AppContext } from "../App";
// import Follower from "./Follower";

// const Following = () => {
//   const { following } = useContext(AppContext);
//   return (
//     <div className="p-3">
//       {
//         following?.length > 0 && following.map((follower, index) => (
//           <Follower key={index} follower={follower} />
//         ))
//       }
//     </div>
//   );
// };

// export default Following;
import React,{ useContext } from "react";
import { AppContext } from "../App";
import Follower from "./Follower";

const Following = React.memo(() => {
  const { following } = useContext(AppContext);

  // Ensure that the 'following' array is not null or undefined
  if (!following || following.length === 0) {
    return <p className="p-3">No followers found.</p>;
  }

  return (
    <div className="p-3">
       {
         following?.length > 0 && following.map((follower, index) => (
           <Follower key={index} follower={follower} />
         ))
       }
     </div>
  );
});

export default Following;
