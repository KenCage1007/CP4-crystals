import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css';
import { UserContext } from '../UserContext';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(UserContext); // Access the context to update the logged-in user
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already in use
    const isEmailUsed = storedUsers.some((user) => user.email === formData.email);
    if (isEmailUsed) {
      setEmailError("There's already an account with this email.");
      return;
    }

    // Add the new user to the stored users
    storedUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Automatically sign in the user by saving their data in currentUser
    localStorage.setItem('currentUser', JSON.stringify(formData));

    // Update the user in the context to trigger header update
    updateUser(formData);

    // Clear the error and navigate to the dashboard
    setEmailError('');
    console.log('Account Created and Signed In:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <h1 className="create-account-header">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-account-field">
            <label htmlFor="email" className="create-account-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="create-account-input"
              required
            />
            {emailError && (
              <div className="email-error">
                {emailError}{' '}
                <button
                  type="button"
                  className="email-error-link"
                  onClick={() => navigate('/signin')}
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
          <div className="create-account-field">
            <label htmlFor="password" className="create-account-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="create-account-input"
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="create-account-field">
            <label htmlFor="firstName" className="create-account-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="create-account-input"
              required
            />
          </div>
          <div className="create-account-field">
            <label htmlFor="lastName" className="create-account-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="create-account-input"
              required
            />
          </div>
          <div className="create-account-field">
            <label htmlFor="phoneNumber" className="create-account-label">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="create-account-input"
            />
          </div>
          <button type="submit" className="create-account-submit-button">
            Create Account
          </button>
        </form>
      </div>

      {/* Divider and Sign In Link */}
      <div className="divider">
        <span className="line"></span>
        <span className="divider-text">Or</span>
        <span className="line"></span>
      </div>
      <button className="sign-in-link" onClick={() => navigate('/signin')}>
        Sign In
      </button>
    </div>
  );
};

export default CreateAccount;
