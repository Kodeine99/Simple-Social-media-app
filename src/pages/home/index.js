import React from "react";
import "./style.css";

import { SignInBtn } from "../../components";
import { CreatePost, Navbar, Feed } from "../../containers";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <CreatePost />
      <Feed />
    </div>
  );
}

export default Home;
