import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';


function Profile() {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
  

    useEffect(() => {
        if(store?.token ){
        actions.loggedInMessage()
        }
	  },[ store.token] )

    useEffect(() => {
      if(!token || token == "" || token == undefined) navigate('/login');
      window.alert("Please log in first")
    }, [ store.token])


  return (
    <div>
        <h1>{store.message}</h1>
        <div className='card'>
        <p>Click to access your token {store.token}</p>
        </div>
    </div>
  )
}

export default Profile