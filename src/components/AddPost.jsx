import { useState, useContext } from "react";
import { Form, Button, Dropdown, InputGroup } from "react-bootstrap";
import { FaHashtag, FaImage } from "react-icons/fa";
import { addPost, getAllPosts } from "../services/API/PostServices";
import { AppContext } from "../App";

const AddPost = () => {
    const { setAllPosts } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [hashtag, setHashtag] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("hashtag", hashtag);
    formData.append("contect", content);
    if (image) {
      formData.append("post_image", image);
    }

    try {
      await addPost(formData);
      const response = await getAllPosts();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to add post:", error);
    }

    // try {
    //   const response = await fetch(
    //     "https://contentsharing-9b70377869cc.herokuapp.com/posts/add_post/",
    //     requestOptions
    //   );
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error adding post:", error);
    // }
  };

  return (
    <Form onSubmit={handlePostSubmit} className="p-4 border rounded">
      <h3 className="mb-4">Add New Post</h3>

      <Form.Group controlId="formTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategory" className="mb-3">
        <Form.Label>Category</Form.Label>
        <Dropdown onSelect={handleCategorySelect}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            {category}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Entertaining">Entertaining</Dropdown.Item>
            <Dropdown.Item eventKey="Educational">Educational</Dropdown.Item>
            <Dropdown.Item eventKey="Social">Social</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group controlId="formHashtags" className="mb-3">
        <Form.Label>Hashtags</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaHashtag />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter hashtags (e.g., #fun, #learning)"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formImage" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaImage />
          </InputGroup.Text>
          <Form.Control type="file" onChange={handleImageUpload} />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formContent" className="mb-4">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Add Post
      </Button>
    </Form>
  );
};

export default AddPost;
