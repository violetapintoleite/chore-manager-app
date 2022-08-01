import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function PasswordReset() {

    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    //redirects to profile page if there's a token
if(token && token != "" && token != undefined ) navigate('/profile');

const handleClick = () => {
    // the action here should check if there's an email in the DB - will be added to FLUX
    actions.createNewUser(email, username, password);
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
        <div className='container text-center'>
        <h1 className="mb-3">PasswordReset</h1>
        <input type="email" className="m-1" placeholder="email" value = {email} onChange={(event) => setEmail(event.target.value)} onInput= {(e) => validateEmail(e)} /> 
        <button className="btn m-1" onClick={handleClick}> Submit </button> <br/>
        </div>
    
    </div>
  )
}

export default PasswordReset;