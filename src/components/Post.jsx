import { useState, useContext } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import {
  FaRegCommentAlt,
  FaStar,
  FaRegEdit,
  FaUser,
  FaTrashAlt,
} from "react-icons/fa";
import {
  addVote,
  addComment,
  updateComment,
  getAllPosts,
  deleteComment,
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
  const [showVotesModal, setShowVotesModal] = useState(false);

  const handleStarClick = async (index) => {
    try {
      await addVote({ post: post?.id, vote: index + 1 });
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

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        if (editingCommentId) {
          await updateComment({
            comment: newComment.trim(),
            post: post?.id,
            id: editingCommentId,
          });
          setEditingCommentId(null);
        } else {
          await addComment({ post: post?.id, comment: newComment.trim() });
        }
        setNewComment("");
        setShowCommentInput(false);
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

  const handleEditComment = (comment) => {
    setNewComment(comment?.comment);
    setEditingCommentId(comment?.id);
  };

  const handleDeleteComment = async (comment) => {
    try {
      await deleteComment({ post: post?.id, id: comment?.id });
      const response = await getAllPosts();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setNewComment("");
    setEditingCommentId(null);
  };

  const handleCommentClick = () => {
    if (!editingCommentId) {
      setShowCommentInput(!showCommentInput);
    }
  };

  const handleShowVotes = () => setShowVotesModal(true);
  const handleCloseVotes = () => setShowVotesModal(false);

  const formattedTime = dayjs(post?.post_time).format("MMMM D, YYYY h:mm A");
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
          {post?.post_image !== "" && (
            <div className="w-100 d-flex justify-content-center">
              <img
                src={post?.post_image}
                alt={`${post?.category}'s profile`}
                className="rounded-circle w-50"
                style={{ height: "300px" }}
              />
            </div>
          )}

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
              <Button
                variant="link"
                className="text-muted p-0 text-decoration-none ms-3"
                onClick={handleShowVotes}
              >
                Show Votes
              </Button>
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
                        <div className="d-flex align-items-center">
                          {user_email === commentObj.user__email && (
                            <>
                              <Button
                                variant="link"
                                className="text-muted p-0 me-2 text-decoration-none"
                                onClick={() => handleEditComment(commentObj)}
                              >
                                <FaRegEdit />
                              </Button>
                              <Button
                                variant="link"
                                className="text-muted p-0 me-2 text-decoration-none"
                                onClick={() => handleDeleteComment(commentObj)}
                              >
                                <FaTrashAlt />
                              </Button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card.Body>

      {/* Modal for displaying votes */}
      <Modal show={showVotesModal} onHide={handleCloseVotes}>
        <Modal.Header closeButton>
          <Modal.Title>Votes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {post?.all_votes?.length > 0 ? (
            post.all_votes.map((vote, index) => (
              <div key={index} className="d-flex justify-content-between">
                <span>{`${vote.user__first_name} ${vote.user__last_name}`}</span>
                <FaStar className="text-warning" /> <span>{vote.vote}</span>
              </div>
            ))
          ) : (
            <p>No votes yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVotes}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Post;
