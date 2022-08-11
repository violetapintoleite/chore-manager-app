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
const [emailError, setEmailError] = useState('Please enter a valid email!')

  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {

      setEmailError('Email is valid!')
    } else {
      setEmailError('Must be a valid email!')
    }
  };

return (
    <div className="text-center mt-5">
      <h1 className="mb-3">Sign Up</h1>
      <div className= "container">
      <h3>Sign up requirements</h3>
      <ul>
        <span className="" >{emailError}</span><br/>
        <span> {username == "" || username.length < 2? <span>Username must be at least 2 characters long</span> : <span></span>} </span> <br/>
        <span> {password == "" || password.length < 8 ? <span className="p-2">Password needs to be at least 8 characters long</span> :  <span></span>} </span>
      </ul>
      </div>
    <div>
      <input type="email" className="m-1 pb-1" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} onInput= {(e) => validateEmail(e)} /> 
      <input type="text" className="m-1 pb-1" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
      <input type="password" className="m-1 pb-1" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      <button className="btn m-1 " onClick={handleClick} disabled={password.length < 8 || username.length < 2}> Submit </button> <br/>
    </div>   
    <h4 className="mt-3"> Already have an account? <a href= "/login"> Login through here </a></h4>     
  </div>
  
)

};

export default Signup



