import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Button,
  Dropdown,
  InputGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { FaHashtag, FaImage } from "react-icons/fa";
import { addPost, updatePost, getAllPosts } from "../services/API/PostServices";
import { AppContext } from "../App";

const AddPost = React.memo(({ existingPost, onCancel }) => {
  const { setAllPosts } = useContext(AppContext);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [hashtag, setHashtag] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title || "");
      setCategory(existingPost.category || "Select Category");
      setHashtag(existingPost.hashtag || "");
      setContent(existingPost.content || "");
      setImageName(existingPost.post_image || "");
    }
  }, [existingPost]);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImageName(selectedFile.name || "");
    } else {
      setImage(null);
      setImageName(""); // Reset if no file is selected
    }
  };


  const handleCategorySelect = (category) => {
    setCategory(category);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (category === "Select Category") {
      setToastMessage("Please select a category");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("hashtag", hashtag);
    formData.append("content", content);

    if (image) {
      formData.append("post_image", image);
    }

    if (existingPost) {
      formData.append("id", existingPost?.id);
    }

    try {
      if (existingPost) {
        await updatePost(formData);
        setToastVariant("success");
        setToastMessage("Post updated successfully!");
        onCancel()
      } else {
        await addPost(formData); // Adding a new post
        setToastVariant("success");
        setToastMessage("Post added successfully!");
      }

      // Clear form fields
      setTitle("");
      setCategory("Select Category");
      setHashtag("");
      setContent("");
      setImage(null);
      setImageName("");

      // Show toast notification
      setShowToast(true);

      // Fetch all posts
      const response = await getAllPosts();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <>
      <Form
        onSubmit={handlePostSubmit}
        className="p-4 mb-3 border rounded shadow-sm w-fit"
      >
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-0 shadow-none mb-3 p-0"
          style={{ resize: "none", overflow: "hidden" }}
          required
        />


        <div className="d-flex flex-column mb-3">
          <div className="d-flex align-items-center">
            <label htmlFor={`post_image_${existingPost?.id || 0}`} className="me-3">
              <FaImage
                size={24}
                style={{ cursor: "pointer" }}
                className="text-primary"
              />
            </label>
            <Form.Control
              id={`post_image_${existingPost?.id || 0}`}
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <span className="text-wrap" style={{ wordBreak: "break-word" }}>
              {imageName || "No image selected"}
            </span>
          </div>

          {existingPost?.post_image && (
            <img
              src={`${existingPost?.post_image}`}
              alt="updated_image"
              className="w-100 h-100 object-fit-cover"
            />
          )}
        </div>
        <div className="d-flex flex-sm-row flex-column align-items-center gap-3 mb-3">
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="me-2"
            required
          />

          <Dropdown onSelect={handleCategorySelect}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              {category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Entertaining">
                Entertaining
              </Dropdown.Item>
              <Dropdown.Item eventKey="Motivational">
                Motivational
              </Dropdown.Item>
              <Dropdown.Item eventKey="Emotional">Emotional</Dropdown.Item>
              <Dropdown.Item eventKey="Sadness">Sadness</Dropdown.Item>
              <Dropdown.Item eventKey="Thought-Provoking">
                Thought-Provoking
              </Dropdown.Item>
              <Dropdown.Item eventKey="Romantic">Romantic</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <InputGroup className="ms-2">
            <InputGroup.Text>
              <FaHashtag />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="#hashtags"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              required
            />
          </InputGroup>
        </div>
        <Button variant="primary" type="submit" className="w-100">
          {existingPost ? "Update Post" : "Add Post"}
        </Button>
        {onCancel && (
          <Button variant="secondary" className="w-100 mt-2" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Form>

      <ToastContainer
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 1050 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
});

export default AddPost;
