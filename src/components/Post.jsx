import { useState, useContext } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaRegCommentAlt, FaStar, FaRegEdit , FaUser, FaTrashAlt  } from "react-icons/fa";
import {
  addVote,
  addComment,
  updateComment,
  getAllPosts,
  deleteComment
} from "../services/API/PostServices";
import { AppContext } from "../App";
import dayjs from "dayjs";
import postImage from "../assets/360_F_527494416_7PWpMBqkWQarxhOgD1vIDzhDxizP1cQd.jpg";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { setAllPosts } = useContext(AppContext);

  const user_email = sessionStorage.getItem("userEmail");

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(
    post.vote_counts
      ? post.all_votes.reduce((sum, vote) => sum + vote.vote, 0) /
          post.vote_counts
      : 0
  );

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Function to handle star click for voting
  const handleStarClick = async (index) => {
    try {
      await addVote({
        post: post?.id,
        vote: index + 1,
      });
      setRating(index + 1);
      const response = await getAllPosts();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to add vote:", error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        if (editingCommentId) {
          // Update existing comment
          await updateComment({
            comment: newComment.trim(),
            post: post?.id,
            id: editingCommentId,
          });
          setEditingCommentId(null);
          setEditingCommentText(""); // Reset editing comment text
        } else {
          // Add new comment
          await addComment({
            post: post?.id,
            comment: newComment.trim(),
          });
        }
        setNewComment("");
        setShowCommentInput(false); // Hide input after submit
        const response = await getAllPosts();

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setAllPosts(responseData.result);
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    }
  };

  // Function to handle comment edit
  const handleEditComment = (comment) => {
    setNewComment(comment?.comment);
    setEditingCommentId(comment?.id);
  };

  const handleDeleteComment = async(comment) => {

    try {
      await deleteComment({
        post: post?.id,
        id: comment?.id,
      });
      const response = await getAllPosts();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  // Function to cancel comment editing
  const handleCancelEdit = () => {
    setNewComment("");
    setEditingCommentId(null);
  };

  // Function to toggle comment input visibility
  const handleCommentClick = () => {
    if (!editingCommentId) {
      // Only toggle visibility if not editing
      setShowCommentInput(!showCommentInput);
    }
  };

  // Formatting the post time using dayjs
  const formattedTime = dayjs(post?.post_time).format("MMMM D, YYYY h:mm A");

  // Formatting the comment time using dayjs
  const formatCommentTime = (time) => dayjs(time).format("MMMM D, YYYY h:mm A");

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex flex-column">
        <Link to={`/profile/${post?.user__email}`} className="custom-link">
          <div className="user-post-image">
            <FaUser size={20} />
          </div>{" "}
          <div>{`${post?.user__first_name} ${post?.user__last_name}`}</div>
        </Link>
        <div className="w-100 mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <strong>{post?.category}</strong>{" "}
            <small className="text-muted">{formattedTime}</small>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <img
              src={postImage}
              alt={`${post?.category}'s profile`}
              className="rounded-circle w-50"
              style={{ height: "300px" }}
            />
          </div>
          <Card.Text className="mt-2">{post?.contect}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="link"
              className="text-muted p-0 text-decoration-none text-black"
              onClick={handleCommentClick}
            >
              <FaRegCommentAlt />{" "}
              <span className="ms-1">{post?.comments?.length}</span>
            </Button>
            <div className="text-muted d-flex align-items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`me-1 ${index < rating ? "text-warning" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStarClick(index)}
                />
              ))}
              <span className="ms-2">({post.vote_counts})</span>
            </div>
          </div>
          {showCommentInput && !editingCommentId && (
            <>
              <Form.Control
                type="text"
                placeholder="Write a comment..."
                className="mt-2 border-0 shadow-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                variant="primary"
                className="mt-2 me-2"
                onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </>
          )}

          {/* Displaying the comments */}
          {post?.comments?.length > 0 && (
            <div className="mt-3">
              {post.comments.map((commentObj) => (
                <div key={commentObj.id} className="mb-2">
                  <strong>{`${commentObj.user__first_name} ${commentObj.user__last_name}`}</strong>
                  <small className="text-muted ms-2">
                    {formatCommentTime(commentObj.comment_time)}
                  </small>
                  <div className="d-flex justify-content-between align-items-center">
                    {editingCommentId === commentObj.id ? (
                      <>
                        <Form.Control
                          type="text"
                          placeholder="Edit your comment..."
                          className="mt-2 border-0 shadow-none"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                          variant="primary"
                          className="mt-2 me-2"
                          onClick={handleCommentSubmit}
                        >
                          Update
                        </Button>
                        <Button
                          variant="secondary"
                          className="mt-2"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div>{commentObj.comment}</div>
                        {user_email === commentObj?.user__email && (
                          <div className="d-flex gap-3">
                            <FaRegEdit
                              className="text-muted cursor-pointer"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditComment(commentObj)}
                            />

                            <FaTrashAlt
                              className="text-muted cursor-pointer"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteComment(commentObj)}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
