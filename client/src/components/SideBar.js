
import React from 'react';
import './styles/SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">

      <div>
        <a href="https://en.wikipedia.org/wiki/Chess">Chess Rules and History</a>
        <p>An overview of chess's rules and history.</p>
      </div>

      <div>
        <a href="https://en.wikipedia.org/wiki/Fischer_random_chess">Fischer Random Chess</a>
        <p>An explanation of Chess960, or Fischer Random Chess</p>
      </div>

      <div>
        <a href="https://en.wikipedia.org/wiki/Bobby_Fischer">Bobby Fischer</a>
        <p>An overview of the creator of the variation himself, Bobby Fischer</p>
      </div>

      <div>
        <a href="https://www.chess.com">Chess.com</a>
        <p>An incredible resource for playing and learning chess.</p>
      </div>

    </div>
  );
};

export default SideBar;
