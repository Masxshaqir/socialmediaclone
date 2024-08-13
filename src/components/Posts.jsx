import { useContext } from "react";
import { AppContext } from "../App";

const Posts = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="p-2" style={{ marginTop: "60px" }}>
      <h3>Posts</h3>
      {userData?.posts?.length > 0 ? (
        userData?.posts.map((post, index) => <div key={index}>{post}</div>)
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
};

export default Posts;
