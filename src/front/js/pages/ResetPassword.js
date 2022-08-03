import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function ResetPassword() {

    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    //redirects to profile page if there's a token
if(token && token != "" && token != undefined ) navigate('/profile');

const handleClick = () => {
  // actions.resetPasswordRequest(email);
};

//PW verification
const [password, setPassword] = useState('')


  return (
    <div>
        <div className='container text-center align-items-center'>
        <h1 className="mb-3">Reset Password</h1>
        <p>Enter your new password below:</p>
        <form className="">
        <input type="password" style={{width: "240px"}} className="m-1 mb-2" placeholder="New Password" value={password} onChange={(event) => setEmail(event.target.value)} /> 
        <br/>
        <input type="password" style={{width: "240px"}} className="m-1" placeholder="Confirm your new password" value={password} onChange={(event) => setEmail(event.target.value)} /> 
        <br/>
        <button className="btn m-1" onClick={handleClick}> Submit </button> 
        </form>
        </div>
    
    </div>
  )
}

export default ResetPassword;