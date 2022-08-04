import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';

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
const [password, setPassword] = useState('');
const [cPassword, setCPassword] = useState('');
const [showErrorMessage, setShowErrorMessage] = useState(false);
const [isCPasswordDirty, setisCPasswordDirty] = useState(false);

const handleCPassword = (e) => {
  setCPassword(e.target.value);
  setisCPasswordDirty(true);
}

useEffect(() => {
  if (isCPasswordDirty) {
      if (password === cPassword) {
          setShowErrorMessage(false);
          
      } else {
          setShowErrorMessage(true)
        
      }
  }
}, [cPassword, password]);

  return (
    <div>
        <div className='container text-center align-items-center'>
        <h1 className="mb-1">Reset password</h1>
        <br/>
       <p>Enter your new password below:</p>
        <span> {password.length < 8 ? <span className="p-2">Password needs to be at least 8 characters long</span> : <span></span>} </span>
        <form className="">
        <input type="password" style={{width: "240px"}} className="m-1 mb-2" placeholder="New Password" value={password} onChange={(event) => setPassword(event.target.value)} /> 
        <br/>
        <input type="password" style={{width: "240px"}} className="m-1" placeholder="Confirm your new password" value={cPassword} onChange={handleCPassword}  /> 
        <br/>
        {showErrorMessage && isCPasswordDirty ? <div> Passwords don't match </div> : ''}
        <button className="btn m-1" disabled={password !== cPassword} onClick={handleClick}> Submit </button> 
        </form>
        </div>
    
    </div>
  )
}

export default ResetPassword;