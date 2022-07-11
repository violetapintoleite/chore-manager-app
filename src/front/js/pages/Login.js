import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

function Login() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState ("");
  // const token = localStorage.getItem("token");
  // console.log("new user created", token)

  const handleClick = () => {
    // actions.createNewUser(email, username, password);
};

return (
    <div className="text-center mt-5">
      <h1 className="mb-3">Login</h1>
    <div>
      <input type="text" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)}/> 
      <input type="text" placeholder="username" value = {username} onChange={(event) => setUsername(event.target.value)}/>
      <input type="password" placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)}/>
      <button onClick={handleClick}> Submit </button>
    </div>   
    <h4 className="mt-3"> Don't yet have an account? <a href= "/signup"> Signup through here </a></h4>  
  </div>
)
};

export default Login