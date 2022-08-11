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
    console.log("handleclick function", email, username, password);
  };

  return (
    <div className="loginandsignuppageheight position-relative">
    <div className="position-absolute top-50 start-50 translate-middle">
        <h1 className="mb-3 text-center">Welcome back!</h1>
        <div>
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value) } 
          />
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <br/>
          <div className="text-center">
          <button
            className="btn"
            onClick={handleClick}
            disabled={password.length < 8 || username.length < 2}
          >
            {" "}
            Submit{" "}
          </button>
          </div>
        </div>
        <p className="mt-3 text-center">
          {" "}
          Don't yet have an account yet?{" "}
          <a href="/signup"> Signup through here.</a>
        </p>{" "}
      </div>
    </div>
  );
}

export default Login;
