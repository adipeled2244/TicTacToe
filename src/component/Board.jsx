import "./Board.css";
import React, { useEffect, useState } from "react";
import Square from "./Square";

const Board = ({ playAgain, setPlayAgain }) => {
  const [player, setPlayer] = useState(1); // 1 -player 1 , 2 - player 2
  const [boardState, setBoardState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]); //intialize to empty board
  const [winner, setWinner] = useState(null); // winner is 1 or 2 or null
  const boardPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (playAgain) {
      resetBoard();
    }
  }, [playAgain]);

  useEffect(() => {
    const res = checkVictory();

    if (res == 0) {
      return;
    }
    if (res == 1) {
      setWinner(1);
    }
    if (res == 2) {
      setWinner(2);
    }
    if (res == -1) {
      setWinner(-1);
    }
  }, [boardState]);
  
  const resetBoard = () => {
    setPlayAgain(false); // reset the play again from App
    setWinner(null); //
    setBoardState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setPlayer(1);
  };

  const handlePlayerClick = (player, place) => {
    setBoardState((prev) => {
      const newState = [...prev];
      newState[place] = player;
      return newState;
    });

    if (player == 1) {
      setPlayer(2);
    } else if (player == 2) {
      setPlayer(1);
    }
  };

  const checkVictory = () => {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    // Iterate over the winning combinations
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      console.log(a, b, c);

      // Check if the positions on the board match the current winning combination
      if (
        boardState[a] !== 0 &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        // Return the player who won (1 or 2)
        return boardState[a];
      }
    }

    //  game not end
    if (boardState.includes(0)) {
      return 0;
    }

    //  game end with draw
    return -1;
  };

  const boardContent = boardPattern.map((item, index) => {
    return (
      <Square
        playAgain={playAgain}
        key={index}
        place={index}
        player={player}
        handleClick={handlePlayerClick}
        boardSign={boardState[index]}
      />
    );
  });

  const messages = () => {
    if (winner) {
      if (winner === -1) {
        return <div className="winner">Draw!</div>;
      }

      return (
        <div className="winner">The winner is {winner === 1 ? "O" : "X"}</div>
      );
    }
  };

  return (
    <div className="board">
      {boardContent}
      {messages()}
    </div>
  );
};

export default Board;
