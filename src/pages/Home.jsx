import { useEffect, useContext } from "react";
import { getAllPosts } from "../services/API/PostServices";
import { AppContext } from "../App";
import Post from "../components/Post";

const Home = () => {
  const { setAllPosts, allPosts } = useContext(AppContext);

  const handleGetAllPosts = async () => {
    try {
      const response = await getAllPosts();

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Await the parsing of the response body as JSON
      const responseData = await response.json();

      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to get all user posts:", error);
    }
  };

  useEffect(() => {
    handleGetAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3">
      {allPosts.length > 0 &&
        allPosts.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default Home;
