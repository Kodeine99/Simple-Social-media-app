import React, { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { signInWithGoogle } from "../../services/auth";
import "./style.css";

function SignInBtn() {
  const [user, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if (userBySignIn) {
      setUser(userBySignIn);
    }
  };

  return (
    <div className="signInBtn" onClick={signInBtnClick}>
      <p>Sign in with Google</p>
    </div>
  );
}

export default SignInBtn;
