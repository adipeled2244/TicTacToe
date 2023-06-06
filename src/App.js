import './App.css';
import React, {useState} from 'react';
import Board from './component/Board';
function App() {
const [playAgain, setPlayAgain] = useState(false);

const handlePlayAgain = (e) => 
{
  e.preventDefault();
  setPlayAgain(true);
};


  return (
    <div className="app">
      <h1>Tic Tac Toe </h1>

        <Board playAgain={playAgain} setPlayAgain={setPlayAgain} />
        <button onClick={()=>setPlayAgain(true)}>Play again</button>
    </div>
 
  );
}

export default App;
