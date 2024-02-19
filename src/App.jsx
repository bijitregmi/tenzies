import React from 'react'
import Die from './components/Die'
import { v4 as uuidv4 } from 'uuid'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App() {

  // States
  const [dicesArr, setDicesArr] = React.useState(newDices())
  const [tenzies, setTenzies] = React.useState(false)
  const [attempts, setAttempts] = React.useState(0)

  // Height and width of confetti
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    const isHeldAll = dicesArr.every(dice => dice.isHeld)
    const isSameAll = dicesArr.every(dice => dice.value === dicesArr[0].value)
    if (isHeldAll && isSameAll) {
      setTenzies(true)
      console.log("Tenzie")
    }
    else {
      setTenzies(false)
    }
  }, [dicesArr])

  // Create individual dice elements
  const diceElements = dicesArr.map((dice, i) => {
    return (
    <Die 
      key={dice.id} 
      value={dice.value} 
      isHeld={dice.isHeld}
      id={dice.id}
      hold={holdDice}   
    />
    )
  })

  // Check if a die is held during roll
  function holdDice(id) {
    setDicesArr(prevDiceArr => prevDiceArr.map(prevDice => {
      return prevDice.id === id ? {...prevDice, isHeld: !prevDice.isHeld} : prevDice
    }
    ))
  }

  // Create a new set of dice
  function newDices() {
    const dices = []
    for (let i = 0; i < 10; i++) {
      dices.push({
        id: uuidv4(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return dices
  }

  // Change non held dice on roll
  function handleClick() {
    if (tenzies) {
      setDicesArr(newDices())
      setAttempts(0)
    }
    else {
      setDicesArr(prevDiceArr => prevDiceArr.map(dice => {
        return dice.isHeld ?
          dice :
          {...dice, id: uuidv4(), value: Math.ceil(Math.random() * 6)}
      }))
      setAttempts(prevAttempts => prevAttempts + 1)
    }
  }

  // App component JSX
  return (
    <main className="main">
      {tenzies && <Confetti width={width} height={height} />}
      <header>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
      <div className="dices">
          {diceElements}
      </div>
      <div className="btn">
        {tenzies && <p className='rolls'>Took <strong>{attempts}</strong> rolls to get Tenzies</p>}
        <button
          className='roll--btn'
          onClick={handleClick}
        >
          <h2>{tenzies ? 'New Game': 'Roll'}</h2>
        </button>
      </div>
    </main>
  )
}

