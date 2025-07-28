import { useState } from "react";

function Square({value,onSquareClick}){
  return(
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default function Board(){

  //Lifting State Up(From Sqaures to Board)
  const[squares,setSqaures]=useState(Array(9).fill(null));
  const[xIsNext,setXisNext]=useState(true);

  const winner = calculateWinner(squares);
  const isDraw=!winner && squares.every(Boolean);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  }else if(isDraw){
    status="It's a draw!";
  }else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(i){
    if(squares[i] || winner) return;

    const nextSquares=squares.slice();
    nextSquares[i]=xIsNext?"X":"O";
    setSqaures(nextSquares);
    setXisNext(!xIsNext);
  }

  function resetGame(){
    setSqaures(Array(9).fill(null));
    setXisNext(true);
  }

  return(
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className="reset-button" onClick={resetGame}>Play Again</button>
    </div>
  );
}