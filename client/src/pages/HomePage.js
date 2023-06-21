
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import ChessBoard from '../components/ChessBoard';
import './styles/HomePage.css';


const HomePage = () => {

  const history = useHistory();

  const [currentBoard, setCurrentBoard] = useState(['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']);


  const navigateToLoginSignup = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      history.push('/profile');
    } else {
      history.push('/login-signup');
    }
  };


  const navigateToProfile = () => {
    history.push('/profile');
  };


  const fetchRandomBoard = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/boards/random');
      const data = await response.json();
      console.log('Random board data:', data);
      setCurrentBoard(data);
    } catch (error) {
      console.error('Error fetching random board:', error);
    }
  };


  const saveBoard = async () => {
     console.log("saveBoard called");
    const token = localStorage.getItem('jwtToken');
     console.log("got token");
    if (!token) {
      // The user is not logged in
      console.log("User is not logged in");
      history.push('/login-signup');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/boards/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ configuration: currentBoard }),
      });

      if (response.ok) {
        console.log('Board saved successfully');
      } else {
        console.error('Error saving board');
      }
    } catch (error) {
      console.error('Error during save:', error);
    }
  };


  return (

    <div className="HomePage">

    <Header />
    <SideBar />

    <div>

     	<div className="HomeBoardContainer">
        	<ChessBoard whitePieces={currentBoard} />
      </div>
      
     	 <div className="button-container">
        	<button className="board-button" onClick={fetchRandomBoard} >Random</button>
        	<button className="board-button" onClick={saveBoard} >Save</button>
      	</div>

        <div className="button-container">
          <button className="other-button" onClick={navigateToLoginSignup}>Log In</button>
          <button className="other-button" onClick={navigateToProfile}>Profile</button>
        </div>

    	</div>

    </div>
  );
}

export default HomePage;
