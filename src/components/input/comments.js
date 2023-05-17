import { useState, useContext, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [isFetching, setIsFetchingComments] = useState(false);

  const notCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong.");
          });
        })
        .then((list) => setCommentsList(list.comments))
        .catch((err) => {
          notCtx.showNotification({
            title: "Error",
            message: err.message || "Something went wrong",
            status: "error",
          });
        });
      setIsFetchingComments(false);
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notCtx.showNotification({
      title: "Submitting...",
      message: "Sending new comment.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notCtx.showNotification({
          title: "Success.",
          message: "New comment successfully submitted.",
          status: "success",
        });
      })
      .catch((err) => {
        notCtx.showNotification({
          title: "Error.",
          message: err.message || "Something went wrong.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button className={classes.btn} onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList comments={commentsList} />}
      {showComments && isFetching && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
