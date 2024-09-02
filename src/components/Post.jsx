import React,{ useState, useContext } from "react";
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
  deletePost,
} from "../services/API/PostServices";
import { AppContext } from "../App";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";

  const Post = React.memo(({ post }) => {
  const { setAllPosts } = useContext(AppContext);
  const user_email = sessionStorage.getItem("userEmail");
  const ownVote = post?.all_votes?.find((v) => v?.user__email == user_email);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(ownVote ? ownVote.vote : 0);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showVotesModal, setShowVotesModal] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);

 
  const handleStarClick = async (vote, index) => {
    try {

      if (ownVote) {
        // User has already voted, update the existing vote
        await addVote({
          post: post?.id,
          vote: index + 1,
          id: ownVote?.id,
        });
      } else {
        // First time voting, create a new vote
        await addVote({
          post: post?.id,
          vote: index + 1,
        });
      }
      setRating(index + 1);
      const response = await getAllPosts();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to submit vote:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (editingCommentId) {
      try {
        await updateComment({
          id: editingCommentId,
          post: post?.id,
          comment: newComment,
        });
        setEditingCommentId(null);
        setNewComment("");
        const response = await getAllPosts();
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const responseData = await response.json();
        setAllPosts(responseData.result);
      } catch (error) {
        console.error("Failed to update comment:", error);
      }
    } else {
      try {
        await addComment({ post: post?.id, comment: newComment });
        setShowCommentInput(false);
        setNewComment("");
        const response = await getAllPosts();
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const responseData = await response.json();
        setAllPosts(responseData.result);
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  const handleEditComment = (comment) => {
    setNewComment(comment.comment);
    setEditingCommentId(comment.id);
  };

  const handleDeleteComment = async (comment) => {
    try {
      await deleteComment(comment.id);
      const response = await getAllPosts();
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
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

  const handleDeletePost = async (post) => {
    try {
      await deletePost({ post: post?.id });
      const response = await getAllPosts();
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleShowVotes = () => setShowVotesModal(true);
  const handleCloseVotes = () => setShowVotesModal(false);

  const formattedTime = dayjs(post?.post_time).format("MMMM D, YYYY h:mm A");
  const formatCommentTime = (time) => dayjs(time).format("MMMM D, YYYY h:mm A");

  const handleEditPost = () => setIsEditingPost(true);

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`me-1 ${index < count ? "text-warning" : ""}`}
        style={{ cursor: "pointer", fontSize: "1.2rem" }}
        onClick={() => handleStarClick(index + 1, index)}
      />
    ));
  };

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex flex-column">
        <Link to={`/profile/${post?.user__email}`} className="custom-link">
          <div className="user-post-image">
            <FaUser size={20} />
          </div>
          <div>{`${post?.user__first_name} ${post?.user__last_name}`}</div>
        </Link>
        <div className="w-100 mt-2 d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-1"><span>Category : </span><b className="text-primary ">{post?.category}</b></div>
          <div className="d-flex justify-content-between align-items-center">
            <strong>{post?.title}</strong>{" "}
            <small className="text-muted">{formattedTime}</small>
            {post?.user__email === user_email && (
              <>
                <Button
                  variant="link"
                  className="p-0 text-muted"
                  onClick={handleEditPost}
                >
                  <FaRegEdit />
                </Button>
                <Button
                  variant="link"
                  className="p-0 text-muted"
                  onClick={() => handleDeletePost(post)}
                >
                  <FaTrashAlt />
                </Button>
              </>
            )}
          </div>
          {isEditingPost ? (
            <AddPost
              existingPost={post}
              onCancel={() => setIsEditingPost(false)}
            />
          ) : (
            <>
              {post?.post_image && (
                <div className="w-100 d-flex justify-content-center my-2">
                  <img
                    src={post?.post_image}
                    alt={`${post?.category}'s profile`}
                    className="w-100 object-fit-cover d-lg-w-50"
                    style={{ height: "300px" }}
                  />
                </div>
              )}
              <Card.Text className="mt-2">{post?.content}</Card.Text>
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
                  {renderStars(rating)}
                  <span className="ms-2">({post.vote_counts || 0})</span>
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
                                    className="text-muted p-0 text-decoration-none me-2"
                                    onClick={() =>
                                      handleEditComment(commentObj)
                                    }
                                  >
                                    <FaRegEdit />
                                  </Button>
                                  <Button
                                    variant="link"
                                    className="text-muted p-0 text-decoration-none"
                                    onClick={() =>
                                      handleDeleteComment(commentObj)
                                    }
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
            </>
          )}
        </div>
      </Card.Body>
      <Modal show={showVotesModal} onHide={handleCloseVotes}>
        <Modal.Header closeButton>
          <Modal.Title>Votes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {post?.all_votes?.length === 0 && <div>No votes yet</div>}
          {post?.all_votes?.map((vote, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mb-2"
            >
              <div>{`${vote.user__first_name} ${vote.user__last_name}`}</div>
              <div className="d-flex">{renderStars(vote.vote)}</div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVotes}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
});

export default Post;
