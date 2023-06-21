
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ChessBoard from '../components/ChessBoard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

import './styles/ProfilePage.css';


const ProfilePage = () => {

  const history = useHistory();
  const [userBoards, setUserBoards] = useState([]);
  const [username, setUsername] = useState('');
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [newComment, setNewComment] = useState('');


  const navigateToHome = () => {
    history.push('/');
  };


  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    history.push('/');
  };


  const handleEdit = (boardId, comment) => {
    setEditingBoardId(boardId);
    setNewComment(comment || '');
  };


  const handleSave = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:5000/api/boards/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        boardId: editingBoardId,
        comment: newComment,
      }),
    });

    const data = await response.json();

    if (data.success) {
      const updatedBoards = userBoards.map((board) =>
        board._id === editingBoardId ? { ...board, comment: newComment } : board
      );
      setUserBoards(updatedBoards);
      setEditingBoardId(null);
      setNewComment('');
    } else {
      // Handle error
    }
  };


  const handleCancel = () => {
    setEditingBoardId(null);
    setNewComment('');
  };


  const handleDelete = async (boardId) => {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:5000/api/boards/delete/${boardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      const updatedBoards = userBoards.filter((board) => board._id !== boardId);
      setUserBoards(updatedBoards);
    } else {
      // Handle error
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken');

      const responseBoards = await fetch('http://localhost:5000/api/boards/load', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const dataBoards = await responseBoards.json();
      setUserBoards(dataBoards);

      const responseUsername = await fetch('http://localhost:5000/api/users/username', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const dataUsername = await responseUsername.json();
      setUsername(dataUsername.username);
    };

    fetchUserData();
  }, []);


  return (
    <div className="ProfilePage">
      <Header />
      <SideBar />

      <div className="ProfileTitle">
        <h1>{username}'s Profile</h1>
      </div>

      <div className="ReturnButtonsContainer">
          <button className="ReturnButtons" onClick={navigateToHome}>Home</button>
          <button className="ReturnButtons" onClick={handleLogout}>Logout</button>
        </div>

      <div className="SavedBoardsView">
        {userBoards.map((board, index) => (
          <div className="boardContainer" key={board._id}>
            <h2>Board {index + 1}</h2>
            <button className="DeleteButton" onClick={() => handleDelete(board._id)}>Delete</button>
            <ChessBoard whitePieces={board.configuration} />
            <textarea 
              className="commentBox" 
              readOnly={editingBoardId !== board._id} 
              value={editingBoardId === board._id ? newComment : board.comment || ''} 
              onChange={(e) => setNewComment(e.target.value)} 
            />
            {editingBoardId === board._id ? (
              <>
              <div>
                  <button className="EditButton" onClick={handleSave}>Save</button>
                  <button className="EditButton" onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <button className="EditButton" onClick={() => handleEdit(board._id, board.comment)}>Edit Comment</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
 };

export default ProfilePage;