import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [heldIsEqual, setHeldIsEqual] = useState(false)
  
  useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const allSameValue = dice.every(die => die.value === dice[0].value)
      const filteredDice = dice.filter(die=> die.isHeld)
      const allHeldSame = filteredDice.every(die=> die.value === filteredDice[0].value)
      
      if (allHeld && allSameValue) {
          setTenzies(true)
      }

      setHeldIsEqual(allHeldSame)


  }, [dice])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  function rollDice() {
      if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      } else {
          setTenzies(false)
          setDice(allNewDice())
      }
  }
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
          heldIsEqual = {heldIsEqual}
      />
  ))
  
  return (
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  )
}
