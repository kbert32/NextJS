import { useState, useEffect } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${props.eventId}`)
      .then((response) => response.json())
      .then((list) => setCommentsList(list.comments));
  }, []);

  return (
    <ul className={classes.comments}>
      {commentsList.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
