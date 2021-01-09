import React, { useContext } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import "./style.css";

function Navbar() {
  const [user, setUser] = useContext(UserContext).user;
  return (
    <div className="navbar">
      <p>Social App</p>
      {user ? (
        <div className="navbar-userInfo">
          <p>{user.displayName}</p>
          <img
            className="navbar-userAvatar"
            src={user.photoURL}
            alt="userAvatar"
          />
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
}

export default Navbar;
