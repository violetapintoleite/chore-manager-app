import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import "../../styles/modules/hometext.css";

function Login() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // use this to then push to specific page if token is present
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //redirects to protected page is token is present in localstorage
  if (token && token != "" && token != undefined) navigate("/profile");

  const handleClick = () => {
    actions.login(email, username, password);
  };

  return (
    <div className="home position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="text-center">Welcome back!</h1>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              id="exampleInputPassword1"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={password.length < 8 || username.length < 2}
          >
            Submit
          </button>
        </form>
        <div></div>
        <p className="mt-3 text-center">
          {" "}
          Don't yet have an account? <a href="/signup"> Signup through here </a>
        </p>{" "}
      </div>
    </div>
  );
}

export default Login;
