import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaRegComment, FaStar } from "react-icons/fa";
import { addVote, addComment } from "../services/API/PostServices";
import dayjs from "dayjs";

const Post = ({ post }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(
    post.vote_counts
      ? post.all_votes.reduce((sum, vote) => sum + vote.vote, 0) /
          post.vote_counts
      : 0
  );

  // Function to handle star click for voting
  const handleStarClick = async (index) => {
    try {
      await addVote({
        post: post?.id,
        vote: index + 1,
      });
      setRating(index + 1);
    } catch (error) {
      console.error("Failed to add vote:", error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await addComment({
          post: post?.id,
          comment: comment.trim(),
        });
        setComment(""); // Clear the input after submission
        setShowCommentInput(false); // Optionally hide the comment input after submission
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  // Function to toggle comment input visibility
  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  // Formatting the post time using dayjs
  const formattedTime = dayjs(post?.post_time).format("MMMM D, YYYY h:mm A");

  // Formatting the comment time using dayjs
  const formatCommentTime = (time) => dayjs(time).format("MMMM D, YYYY h:mm A");

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex">
        <img
          src={post?.post_image}
          alt={`${post?.category}'s profile`}
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px" }}
        />
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <strong>{post?.category}</strong>{" "}
            <span className="text-muted">{formattedTime}</span>
          </div>
          <Card.Text className="mt-2">{post?.contect}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="link"
              className="text-muted p-0"
              onClick={handleCommentClick}
            >
              <FaRegComment /> <span className="ms-1">Comment</span>
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
          {showCommentInput && (
            <>
              <Form.Control
                type="text"
                placeholder="Write a comment..."
                className="mt-2 border-0 shadow-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                variant="primary"
                className="mt-2"
                onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </>
          )}

          {/* Displaying the comments */}
          {post?.comments?.length > 0 && (
            <div className="mt-3">
              {post.comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <strong>{`${comment.user__first_name} ${comment.user__last_name}`}</strong>
                  <span className="text-muted ms-2">
                    {formatCommentTime(comment.comment_time)}
                  </span>
                  <div>{comment.comment}</div>
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
