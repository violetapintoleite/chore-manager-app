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
  const [emailError, setEmailError] = useState("Please enter a valid email!");

  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("Email is valid!");
    } else {
      setEmailError("Must be a valid email!");
    }
  };

  return (
    <div className="loginandsignuppageheight position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="mb-3 text-center">Sign Up</h1>

        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onInput={(e) => validateEmail(e)}
          />
          <div className="text-danger">
            <span className="">{emailError}</span>
          </div>
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="text-danger">
            {username == "" || username.length < 2 ? (
              <span>Username must be at least 2 characters long</span>
            ) : (
              <span></span>
            )}
          </div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="text-danger">
            {password == "" || password.length < 8 ? (
              <span className="p-2">
                Password needs to be at least 8 characters long
              </span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <br />
        <div className="text-center">
          <button
            className="btn m-1 "
            onClick={handleClick}
            disabled={password.length < 8 || username.length < 2}
          >
            {" "}
            Submit{" "}
          </button>{" "}
        </div>
        <h4 className="mt-3">
          {" "}
          Already have an account? <a href="/login"> Login through here </a>
        </h4>
      </div>
    </div>
  );
}

export default Signup;
