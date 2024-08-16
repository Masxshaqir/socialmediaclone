import { useEffect, useContext, useRef } from "react";
import { getAllPosts } from "../services/API/PostServices";
import { AppContext } from "../App";
import Post from "../components/Post";
import AddPost from "../components/AddPost";

const Home = () => {
  const { setAllPosts, allPosts } = useContext(AppContext);

  // useRef to ensure the API is called only once
  const hasFetchedPosts = useRef(false);

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
    if (!hasFetchedPosts.current) {
      handleGetAllPosts();
      hasFetchedPosts.current = true; // Mark that posts have been fetched
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="p-3 custom-padding-bottom">
      <AddPost />
      {allPosts.length > 0 &&
        allPosts.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default Home;
