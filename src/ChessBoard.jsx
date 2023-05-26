import React, { useState } from "react";
import Knight from "./Knight.jsx";

function ChessBoard() {
  const boardCoordinates = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
    ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8']
  ];

  const [knightPosition, setKnightPosition] = useState(boardCoordinates[0][0]);
  const [userChoice, setUserChoice] = useState(null);
  const [loggedMoves, setLoggedMoves] = useState([]);
  const [TravalisMode, setTravalisMode] = useState(false);
  function evaluateMove(userSelection) {
    const positionCoordinates = {};
    boardCoordinates.forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        positionCoordinates[square] = [rowIndex, colIndex];
      });
    });

    const startingPosition = knightPosition;
    const [startingX, startingY] = positionCoordinates[startingPosition];
    const [endingX, endingY] = positionCoordinates[userSelection];

    const xDifference = Math.abs(startingX - endingX);
    const yDifference = Math.abs(startingY - endingY);

    if ((xDifference === 2 && yDifference === 1) || (xDifference === 1 && yDifference === 2)) {
      setKnightPosition(userSelection);
      return true;
    } else {
      return false;
    }
  }
  function travail(userSelection) {
    const positionCoordinates = {};
    boardCoordinates.forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        positionCoordinates[square] = [rowIndex, colIndex];
      });
    });
  
    const queue = [[knightPosition]];
    const visited = new Set();
  
    while (queue.length > 0) {
      const path = queue.shift();
      const currentPosition = path[path.length - 1];
  
      if (currentPosition === userSelection) {
        setLoggedMoves([...path]);
        setKnightPosition(userSelection);
        break;
      }
  
      if (visited.has(currentPosition)) {
        continue;
      }
  
      visited.add(currentPosition);
  
      const [startingX, startingY] = positionCoordinates[currentPosition];
  
      const possibleMoves = [
        [startingX + 2, startingY + 1],
        [startingX + 2, startingY - 1],
        [startingX - 2, startingY + 1],
        [startingX - 2, startingY - 1],
        [startingX + 1, startingY + 2],
        [startingX + 1, startingY - 2],
        [startingX - 1, startingY + 2],
        [startingX - 1, startingY - 2],
      ];
  
      possibleMoves.forEach(([x, y]) => {
        const square = boardCoordinates[x]?.[y];
        if (square && !visited.has(square)) {
          queue.push([...path, square]);
        }
      });
    }
  }
  
  const handleClick = (rowIndex, colIndex) => {
    const clickedSquare = boardCoordinates[rowIndex][colIndex];
    setUserChoice(clickedSquare);
    if (!evaluateMove(clickedSquare)) {
      alert("Invalid move. The knight can only move in an L shape.");
    }
  };
  const handleClickTravails = (rowIndex, colIndex) => {
    const clickedSquare = boardCoordinates[rowIndex][colIndex];
    setUserChoice(clickedSquare);
    setLoggedMoves([]); 
    travail(clickedSquare);
  };

  return (
    <div> 
        <button className="mode" onClick={() => setTravalisMode(!TravalisMode)}>Travails Mode</button>
        <div className="board">
            {boardCoordinates.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((square, colIndex) => (
                        <div className="square" key={square} onClick={() => {if (TravalisMode) {handleClickTravails(rowIndex, colIndex)} else handleClick(rowIndex, colIndex)}}>
                            {square === knightPosition && <Knight />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <div className="moveLog"><h1>Move Log</h1><br />
          <ul>{loggedMoves.map((move) =><li>{move}</li> )}</ul>
        </div>
    </div>
    );
}
export default ChessBoard;
