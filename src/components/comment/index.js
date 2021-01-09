import React from "react";

function Comment({ username, caption }) {
  return (
    <div>
      <p className="post__userInCap">
        <span>{username}</span>
        {caption}
      </p>
    </div>
  );
}

export default Comment;
