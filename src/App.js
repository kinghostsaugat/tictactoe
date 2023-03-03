import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ isNext, squares, onPlay }) {
  const onClickHandle = (i) => {
    if (calculateWinner(squares) || squares[i] ) {
      return;
    }
    const nextSqaure = squares.slice();
    if (isNext) {
      nextSqaure[i] = "X";
    } else {
      nextSqaure[i] = "O";
    }
    onPlay(nextSqaure)
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (isNext ? "X" : "o");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onClickHandle(0)} />
        <Square value={squares[1]} onSquareClick={() => onClickHandle(1)} />
        <Square value={squares[2]} onSquareClick={() => onClickHandle(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onClickHandle(3)} />
        <Square value={squares[4]} onSquareClick={() => onClickHandle(4)} />
        <Square value={squares[5]} onSquareClick={() => onClickHandle(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onClickHandle(6)} />
        <Square value={squares[7]} onSquareClick={() => onClickHandle(7)} />
        <Square value={squares[8]} onSquareClick={() => onClickHandle(8)} />
      </div>
    </>
  );
}

function App() {
  const [xIsNext, setIsNext] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(null));
  const currentSquare = history[history.length - 1];

  function handlePlay(nextSqaure) {
    setHistory([...history, nextSqaure]);
    setIsNext(!xIsNext);
  }

  return (
    <div className="App">
      <div className="game-play">
        <Board
          isNext={xIsNext}
          history={currentSquare}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{/* TO Do*/}</ol>
      </div>
    </div>
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

export default App;
