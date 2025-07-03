import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Selector from './components/Selector';
import Confetti from 'react-confetti';

function App() {
  const [gameState, setGameState] = useState('intro');
  const [rolls, setRolls] = useState(0);
  const [topScores, setTopScores] = useState({
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:[],
    10:[],
    11:[],
    12:[],
    13:[],
    14:[],
    15:[],
    16:[],
    17:[],
    18:[],
    19:[],
    20:[]
  });
  const [numOfDice, setNumOfDice] = useState(10);

  const width = window.innerWidth
  const height = document.body.scrollHeight
  
  return (
    <>
      <main>
        {gameState === 'finished' ? <Confetti numberOfPieces={100} width ={width} height={height}/> : null}
        <hr className='decorative upper'/>
        <h1>Tenzi</h1>
        <hr className='decorative lower'/>
        {gameState === 'intro' ? 
          <div className="introBlock">
            <p className="introText">A game where you roll all dice until they are the same.</p> 
            <Selector
              setNumOfDice={setNumOfDice}
              setGameState={setGameState}
              numOfDice={numOfDice}
            />
          </div>
        : 
          <Game
            numOfDice={numOfDice}
            rolls={rolls}
            setRolls={setRolls}
            topScores={topScores}
            setTopScores={setTopScores}
            setNumOfDice={setNumOfDice}
            gameState={gameState}
            setGameState={setGameState}
          />
        }
      </main>
    </>
  )
}

export default App
