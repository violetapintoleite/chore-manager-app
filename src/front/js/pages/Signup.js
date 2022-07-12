import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");
  const [btnDisabled, setbtnDisabled] = useState (true);
  const [message, setMessage] = useState("");
  
  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();
  
  if(token && token != "" && token != undefined) navigate('/profile');

  const checkPassword = () => {
    if(password === ""){
      // setbtnDisabled(true)
      setMessage("text")
    } else if (password !== "" && password.length <= 8)
    { 
      // setbtnDisabled(true)
      setMessage("password needs to be at least 8 characters")
    }
    else{
      setMessage(null)
      // setbtnDisabled(false)
    };
  };

  const handleClick = () => {
    checkPassword();
    actions.createNewUser(email, username, password);
};

return (
    <div className="text-center mt-5">
      <h1 className="mb-3">Sign Up</h1>
    <div>
      <input type="text" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/> 
      <input type="text" placeholder="username" value = {username} onChange={(event) => setUsername(event.target.value)}/>
      <input type="password" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
      <button onClick={handleClick} isDisabled={btnDisabled}> Submit </button>
      { message &&  <div className="message">{message}</div>}
    </div>   
    <h4 className="mt-3"> Already have an account? <a href= "/login"> Login through here </a></h4>  
   
  </div>
  
)

};

export default Signup