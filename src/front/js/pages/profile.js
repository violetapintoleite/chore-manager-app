import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';


function Profile() {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(store?.token && token != "" ){
        actions.checkIfAuthorized()
        }
	  },[ store.token] )

    //redirect to the /login page if there is no token present
  if(!token || token == "" || token == undefined) navigate('/login')

  return (
    <div>
        <h1>{store.email}</h1>
        <div className='card'>
        <p>Click to access your token {store.token}</p>
        </div>
    </div>
  )
}

export default Profile