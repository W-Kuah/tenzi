import { useState, useEffect } from 'react';
import Die from './Die';
import Selector from './Selector';
import Scoreboard from './Scoreboard';
import { nanoid } from 'nanoid';


const testDice = [
  {
    value: 4,
    isHeld: true,
    id: nanoid(),
    animating: false,
    rolls: 0
  },
  {
    value: 4,
    isHeld: true,
    id: nanoid(),
    animating: false,
    rolls: 0
  },
  {
    value: 4,
    isHeld: true,
    id: nanoid(),
    animating: false,
    rolls: 0
  },
  {
    value: 3,
    isHeld: false,
    id: nanoid(),
    animating: false,
    rolls: 0
  },
]
export default function Game(props) {
  const { numOfDice, rolls, setRolls, topScores, setTopScores, setNumOfDice, gameState, setGameState } = props;

  const genAllNewDice = () => {
    return new Array (numOfDice)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
        animating: false,
        rolls: 0
      }))
  }

  const [dice, setDice] = useState([]);
  
  const gameWon = dice.every(die => !die.animating) && dice.every(die => die.value === dice[0].value);

  const rollDice = () => {
    if (gameWon) return;
    setDice(oldDice => oldDice.map(die => 
      die.isHeld ?
        die :
        {...die, 
          value: Math.ceil(Math.random() * 6),
          rolls: die.rolls + 1,
          animating: true
        }
    ));
    setRolls(rolls => (rolls + 1));
  }

  const hold = (id) => {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ?
        {...die, 
          isHeld: !die.isHeld 
        }
        : die
    ));
  }

  const switchDieAnim = (id, boolVal) => {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ? 
        {...die,
          animating: boolVal
        }
        : die
    ));
  }

  const handleReset = () => {
    // setDice(() => genAllNewDice())
    setDice(testDice);
    setRolls(0);
  }

  const diceElems = dice.map((dieValues) => (
    <Die 
      key={dieValues.id}
      value={dieValues.value}
      isHeld={dieValues.isHeld}
      rolls={dieValues.rolls}
      hold={() => hold(dieValues.id)}
      switchDieAnim={(boolVal) => switchDieAnim(dieValues.id, boolVal)}
      animating={dieValues.animating}
    />
  ));

  const allRolled = dice.every(item => item.animating === false);


  const addNumber = (currentNumbers, newNumber) => {

    if (currentNumbers.length === 0) return [newNumber];
    if (currentNumbers.length === 5 && newNumber >= currentNumbers[4]) {
      return currentNumbers;
    }
    let insertIndex = 0;

    while (insertIndex < currentNumbers.length && newNumber > currentNumbers[insertIndex]) {
      insertIndex++;
    }
    const newState = [
      ...currentNumbers.slice(0, insertIndex),
      newNumber,
      ...currentNumbers.slice(insertIndex)
    ];
    
    return newState.length > 5 ? newState.slice(0, 5) : newState;
  }
  useEffect(() => {
    if (dice.length !== 0 && gameWon && gameState === 'play') {
      const newArr = addNumber(topScores[numOfDice], rolls);
      setTopScores(prevTopScores => ({
        ...prevTopScores,
        [numOfDice]: newArr
      }))
      setGameState('finished');
    }
  }, [gameWon])
  
  useEffect(() => {
    if (gameState === 'play') {
      handleReset();
    }
  }, [gameState])

  return (
    <div className="game">
      <div className="instructions">
        {
          gameWon ?<p>You won!! <br /> Go ahead and start a new game. Beat your high score.</p> 
          : <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        }
      </div>
      <div className="gameInfo">
        <span>{numOfDice} Die Game</span>
        <span>Total Rolls: {rolls}</span>
      </div>
      
      <div className="board">
        {diceElems}
      </div>
      {gameWon ?
      <>
        {gameState === 'finished' ? 
          <Scoreboard
            numOfDice={numOfDice}
            topScores={topScores}
          />
         : null}
        <Selector 
          setNumOfDice={setNumOfDice}
          setGameState={setGameState}
          numOfDice={numOfDice}
        />
      </>
      : <button className={`roll ${allRolled ? '' : 'rolling'}`} onClick={allRolled ? rollDice: null} >{allRolled ? 'Roll' :'Rolling'}</button>}
    </div>
  )
}
