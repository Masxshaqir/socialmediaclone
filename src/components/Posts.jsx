import React, { useContext } from "react";
import { AppContext } from "../App";
import Post from "./Post";

const Posts =React.memo( () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="p-3">
      {userData?.posts?.length > 0 ? (
        userData?.posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
});

export default Posts;
