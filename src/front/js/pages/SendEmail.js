import React, {useContext} from 'react'
import { Context } from "../store/appContext";

function SendEmail() {

    const { store, actions } = useContext(Context);


const handleClick = () => {  
  actions.sendEmail();
  console.log("button clicked");
};
  return (
    <div>
        <h1>SendEmail</h1>
        <button className='btn' onClick={handleClick}>Send Email</button>

    </div>
  )
}

export default SendEmail
