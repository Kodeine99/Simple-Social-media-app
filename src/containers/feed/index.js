import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "../post";
import "./style.css";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  return (
    <div className="feed">
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            id={id}
            avatarUrl={post.avatarUrl}
            username={post.username}
            photoUrl={post.photoUrl}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </div>
  );
}

export default Feed;
