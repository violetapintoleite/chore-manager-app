import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");
  // use this to then push to specific page if token is present
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //redirects to protected page is token is present in localstorage
  if(token && token != "" && token != undefined ) navigate('/profile');
  
  const handleClick = () => {
    actions.login(email, username, password);
    
};


return (
    <div className=" container text-center mt-5">
      <h1 className="mb-3">Login</h1>
    <div>
      <input type="text" className="m-1 pb-1" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/> 
      <input type="text" className="m-1 pb-1" placeholder="username" value = {username} onChange={(event) => setUsername(event.target.value)}/>
      <input type="password" className="m-1 pb-1" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
    </div>
    <div className="align-items-center">
      <button className="btn m-1" onClick={handleClick}> Submit </button>
      <Link to="/reset">
      <button className="btn m-1" > Forgot Password? </button>
      </Link>
    </div>   
    <h4 className="mt-3"> Don't yet have an account? <a href= "/signup"> Signup through here </a></h4>
    {/* conditional rendering if there's a failed login attempt? */}
   
  </div>
)
};

export default Login