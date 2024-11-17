import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Please fill all fields');
      return;
    }
    if (username.length < 5) {
      setErrorMessage('Username must be at least 5 characters long');
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://cartbackend-nor8.onrender.com/usersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setTimeout(() => navigate('/login'), 2000);
      }
      else {
        const data = await response.json();
        setErrorMessage(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="submit-btn" type="submit">Signup</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <p className="login-link">Already have an account? <Link to="/login" className="login-text">Login</Link></p>
    </div>
  );
};

export default Signup;
