import React, { useContext } from "react";
import "./style.css";
import { UserContext } from "../../contexts/user";
import Comment from "../../components/comment";
import { db, storage } from "../../firebase";
import { CommentInput } from "../../components";
// material-ui
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function Post({ avatarUrl, username, id, photoUrl, caption, comments }) {
  const [user, setUser] = useContext(UserContext).user;
  const deletePost = () => {
    // 1.delete image from firebase storage

    // get ref to the image file u like to delete
    var imageRef = storage.refFromURL(photoUrl);

    // delete the file
    imageRef
      .delete()
      .then(() => {
        console.log("delete successfully");
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });

    // 2. delete thne post from firebase firestore
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("delete post info successfully");
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <img className="post__userAvatar" src={avatarUrl} alt="post__photo" />
          <p>{username}</p>
        </div>
        {user ? (
          <IconButton onClick={deletePost} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        ) : (
          <></>
        )}
      </div>
      <div className="post__body">
        <img className="post__photoUrl" src={photoUrl} alt="post__photo" />
      </div>
      <div className="post__caption">
        <p className="post__userInCap">
          <span>{username}</span>
          {caption}
        </p>
      </div>

      {comments ? (
        comments.map((comment, index) => (
          <Comment
            key={index}
            username={comment.username}
            caption={comment.comment}
          />
        ))
      ) : (
        <></>
      )}
      {user ? <CommentInput id={id} /> : <></>}
    </div>
  );
}

export default Post;
