import React from 'react'
import '../styles/ForgotPassword.css'

const ForgotPassword = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-box">
        <h1 className="forgot-password-header">Password assistance</h1>
        <p className="forgot-password-subtext">
          Enter the email address or mobile phone number associated with your Oasis Wishes account.
        </p>
        <div className="forgot-password-field">
          <label className="forgot-password-label" htmlFor="contact-info">
            Email or mobile phone number
          </label>
          <input type="text" id="contact-info" className="forgot-password-input" />
        </div>
        <button className="forgot-password-submit-button">Continue</button>
      </div>
    </div>
  )
}

export default ForgotPassword
