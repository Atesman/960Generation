
import React from 'react';
import './styles/ChessBoard.css';

const whiteDictionary = [
  { symbol: 'K', unicode: '\u2654' },
  { symbol: 'Q', unicode: '\u2655' },
  { symbol: 'R', unicode: '\u2656' },
  { symbol: 'B', unicode: '\u2657' },
  { symbol: 'N', unicode: '\u2658' },
  { symbol: 'P', unicode: '\u2659' },
];

const blackDictionary = [
  { symbol: 'K', unicode: '\u265A' },
  { symbol: 'Q', unicode: '\u265B' },
  { symbol: 'R', unicode: '\u265C' },
  { symbol: 'B', unicode: '\u265D' },
  { symbol: 'N', unicode: '\u265E' },
  { symbol: 'P', unicode: '\u265F' },
];


const ChessBoard = ({whitePieces}) => {

  const boardSize = 8;

  const initialBoardState = [
    whitePieces.map((p) => p.toLowerCase()),
    Array(8).fill('p'),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill('P'),
    whitePieces.map((p) => p.toUpperCase()),
  ];


  const createBoard = () => {

    let board = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push((i + j) % 2 === 0 ? 'white' : 'black');
      }
      board.push(row);
    }
    return board;
  };


  // eslint-disable-next-line no-unused-vars
  const chessBoard = createBoard();


  return (
    <div className="chess-board">
      {initialBoardState.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => {
            const color = (rowIndex + cellIndex) % 2 === 0 ? 'white' : 'black';
            const pieceSymbol = initialBoardState[rowIndex][cellIndex];
            const pieceColor = pieceSymbol && pieceSymbol === pieceSymbol.toUpperCase() ? 'white' : 'black';
            const pieceUnicode = pieceSymbol && getPieceUnicode(pieceSymbol.toUpperCase(), pieceColor);

            return (
              <div key={cellIndex} className={`board-cell ${color}`}>
                {pieceUnicode && <span className="piece">{pieceUnicode}</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const getPieceUnicode = (symbol, color) => {
  const dictionary = color === 'white' ? whiteDictionary : blackDictionary;
  const piece = dictionary.find((item) => item.symbol === symbol);
  return piece ? piece.unicode : '';
};


export default ChessBoard;
