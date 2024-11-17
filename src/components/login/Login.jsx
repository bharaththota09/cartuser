import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css';
import CartContext from '../../context/CartContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let { fetchSavedItems } = useContext(CartContext)

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    if (token && userId) {
      fetchSavedItems(userId);
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and Password are required');
      return;
    }

    try {
      const response = await fetch('https://cartbackend-nor8.onrender.com/userlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        setError('Invalid credentials');
        return;
      }

      const data = await response.json();
      if (data && data.userid) {
        Cookies.set('token', data.token);
        Cookies.set('userId', data.userid);
        setError('');
        fetchSavedItems(data.userid);
        navigate('/')
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <label className="form-label">
          Username:
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <br />
        <button className="submit-btn" type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup" className="signup-text">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;

