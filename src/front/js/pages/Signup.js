import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "../../styles/modules/hometext.css";

function Signup() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isLoggedIn = isLoggedIn;

  //redirects to profile page if there's a token
  if (token && token != "" && token != undefined) navigate("/profile");

  // onclick handler to submit info to backend
  const handleClick = () => {
    actions.createNewUser(email, username, password);
  };

  //email verification
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  return (
    <div className="home position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="mb-3 text-center">Sign Up</h1>
        <div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onInput={(e) => validateEmail(e)}
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="btn"
            onClick={handleClick}
            disabled={password.length < 8 || username.length < 2}
          >
            {" "}
            Submit{" "}
          </button>{" "}
          <br />
          <span className="text-danger">{emailError}</span>
          {username == "" || username.length < 2 ? (
            <p>"username needs to be at least 2 characters"</p>
          ) : password == "" || password.length < 8 ? (
            <p className="p-2">
              Password needs to be at least 8 characters long
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <p className="mt-3 text-center">
          {" "}
          Already have an account? <a href="/login"> Login through here </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
