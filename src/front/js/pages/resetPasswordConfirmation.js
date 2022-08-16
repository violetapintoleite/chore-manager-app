import React from 'react'

function ResetPasswordConfirmation() {
  return (
    <div>
          <div className='container text-center align-items-center pt-5'>
            <h2 className=' pb-5'>Thanks for submitting for a password reset</h2> 
            <p>If the email has been registered, you will have received an password reset email. Please check your email</p>
            <p>If you have not recieved an email, <a href="/signup">please try signing up through here.</a></p>
          </div>
    </div>
  )
}

export default ResetPasswordConfirmation