import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function ForgotPassword() {

    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    //redirects to profile page if there's a token
// if(token && token != "" && token != undefined ) navigate('/profile');

const handleClick = () => {
  actions.forgotPasswordRequest(email);
  let confirmationPage= '/pw-reset-confirmation';
  navigate(confirmationPage);
};

//email verification
const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  };

  return (
    <div>
        <div className='container text-center align-items-center'>
        <h1 className="mb-3">Forgot Password</h1>
        <p>Enter your email to get a password recovery email</p>
        <input type="email" className="m-1" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} onInput= {(e) => validateEmail(e)} /> 
        <button className="btn m-1" onClick={handleClick}> Submit </button> 
        <br/>
        <span className="text-danger" >{emailError}</span> 
        <br/>
        <p>Haven't received your reset email, or still have issues? <a href="/#">Contact us here.</a></p>
        </div>
    
    </div>
  )
}

export default ForgotPassword;