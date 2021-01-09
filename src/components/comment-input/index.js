import React, { useContext, useState } from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";

import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

function CommentInput({ comments, id }) {
  const [comment, setComment] = useState("");
  const [user, setUser] = useContext(UserContext).user;
  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    comment !== "" &&
      // add comment to the post info
      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

    db.collection("posts")
      .doc(id)
      .update({
        comments: commentArray,
      })
      .then(() => {
        setComment("");
        console.log("Comment added");
      })
      .catch((err) => console.log(`Error ${err}`));
  };
  return (
    <div className="commentInput">
      <textarea
        className="commentInput__textArea"
        rows="1"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <IconButton onClick={addComment} aria-label="delete">
        <SendIcon />
      </IconButton>
    </div>
  );
}

export default CommentInput;
