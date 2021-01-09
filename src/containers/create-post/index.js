import React, { useContext, useState } from "react";
import "./style.css";

import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import makeId from "../../helper/function";

import firebase from "firebase";
import { db, storage } from "../../firebase";

function CreatePost() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    var selectedImage = URL.createObjectURL(e.target.files[0]);

    var imagePreview = document.getElementById("image-preview");
    imagePreview.src = selectedImage;
    imagePreview.style.display = "block";
  };
  const handleUpload = () => {
    var imageName = makeId(10);
    const uploadTask = storage.ref(`image/${imageName}.jpg`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function 1%, 2%, ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // get download url and upload the post info

        storage
          .ref("image")
          .child(`${imageName}.jpg`)
          .getDownloadURL()
          .then((imageUrl) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              photoUrl: imageUrl,
              username: user.email.replace("@gmail.com", ""),
              avatarUrl: user.photoURL,
            });
          });

        setCaption("");
        setProgress(0);
        setImage(null);

        document.getElementById("image-preview").style.display = "none";
      }
    );
  };
  return (
    <div className="createPost">
      {user ? (
        <div className="createPost__loggedIn">
          <p>Create Post</p>
          <div className="createPost__loggedInCenter">
            <textarea
              rows="3"
              name="message"
              id="message"
              className="createPost__textArea"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="createPost__imagePreview">
              <img id="image-preview" alt=""></img>
            </div>
          </div>
          <div className="createPost__loggedInBottom">
            <div className="createPost__imageUpload">
              <label htmlFor="fileInput">
                <AddAPhotoIcon
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleChange}
              ></input>
            </div>
            <button
              className="createPost__uploadBtn"
              onClick={handleUpload}
              style={{ color: caption ? "#000" : "lightgray" }}
            >
              {`Upload ${progress !== 0 ? progress : ""}`}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <SignInBtn />
          <p style={{ paddingLeft: "10px" }}>to Post & Comment</p>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
