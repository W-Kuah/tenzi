import {useRef, useState, useEffect} from 'react'
import Select from 'react-select'

export default function Selector(props) {
  const { setNumOfDice, setGameState, numOfDice } = props;
  const options = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },
  ]
  const foundValue = options.find(obj => obj.value === numOfDice.toString());
  const [selectedVal, setSelectedVal] = useState(foundValue.value);
  const selectRef = useRef(null);

  

  const startGame = () => {

    setNumOfDice(parseInt(selectedVal));
    setGameState('play')
  }

  useEffect(() => {
    selectRef.current.focus();
  }, [])


  return (
    <div className="selector">
        <hr />
        <p> Select the number of dice you want to play with and beat your high scores.</p>
        <label >
            Number of Dice:
            <Select 
                ref={selectRef}
                options={options}
                isSearchable={false}
                defaultValue={foundValue}
                onChange={(option) => setSelectedVal(option.value)}
            />
        </label>
        <button onClick={startGame}>New Game</button>
    </div>
  )
}
