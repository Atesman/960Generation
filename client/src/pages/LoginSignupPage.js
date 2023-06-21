
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import './styles/LoginSignupPage.css';


const LoginSignupPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // New state variable for the message

  const history = useHistory();


  const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User logged in successfully:', data);
      localStorage.setItem('jwtToken', data.token);
      history.push('/profile');
    } else {
      setMessage("Invalid username/password");
      console.error('Login error:', data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
    console.log('Username:', username, ' logged in.');
  };


  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(username, ' signed up successfully:');
        setMessage("Successfully Signed Up!");
      } else {
        setMessage("Username Taken");
        console.error('Signup error:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };


  const navigateToHome = () => {
    history.push('/');
  };

  return (
  <div className="LoginSignupPage">
    <Header />
    <h1 className="title">Login / Signup</h1>
    <div className="login-form">
      <div className="input-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="message-container">
        <p>{message}</p> {/* Display the message */}
      </div>
      <div className="button-container">
        <button className="bttn" onClick={handleLogin}>Log In</button>
        <button className="bttn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
    <div className="home-button-container">
      <button className = "bttn2" onClick={navigateToHome}>Home</button>
    </div>
  </div>
);
};

export default LoginSignupPage;
