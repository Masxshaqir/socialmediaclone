import { useEffect } from "react";
import { addPost } from "../services/API/PostServices";

const Home = () => {
  // useEffect(() => {
  //   const handleAddPost = async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("title", "Entertaining");
  //       formData.append("category", "Entertaining");
  //       formData.append("hashtag", "#all #post");
  //       formData.append(
  //         "contect",
  //         "Second post added to test"
  //       );

  //       await addPost(formData);
  //     } catch (error) {
  //       console.error("Failed to add post:", error);
  //     }
  //   };

  //   handleAddPost();
  // }, []);
  return (
    <div className="p-3">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
