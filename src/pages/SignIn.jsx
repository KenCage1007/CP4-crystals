import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';
import { UserContext } from '../UserContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { updateUser } = useContext(UserContext); // Access the context
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find((user) => user.email === email);

    if (!user) {
      setError(
        <>
          That email is not currently stored.{' '}
          <Link to="/create-account" className="error-link">
            Create an account
          </Link>
        </>
      );
      return;
    }

    if (user.password !== password) {
      setError('Your password is incorrect.');
      return;
    }

    // Update the user in context and localStorage
    updateUser(user);

    // Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-box">
        <h1 className="sign-in-header">Registered Customers</h1>
        <p className="sign-in-subtext">
          If you have an account, sign in with your email address or phone number.
        </p>

        <form onSubmit={handleSignIn}>
          <div className="sign-in-field">
            <label className="sign-in-label" htmlFor="email">
              Email or phone number
            </label>
            <input
              type="text"
              id="email"
              className="sign-in-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sign-in-field">
            <label className="sign-in-label" htmlFor="password">
              Password
            </label>
            <div className="password-input-container">
              <input
                type="password"
                id="password"
                className="sign-in-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="sign-in-submit-button">Sign In</button>
        </form>

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </div>

      <div className="divider">
        <span className="line"></span>
        <span className="divider-text">Or</span>
        <span className="line"></span>
      </div>

      <Link to="/create-account" className="create-account-box">
        Create Account
      </Link>
    </div>
  );
};

export default SignIn;
