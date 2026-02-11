import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 *
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    /*const newDice = [];
    for (let i = 0; i < 10; i++) {
      const rand = Math.ceil(Math.random() * 6);
      newDice.push(rand);
    }
    return newDice;*/

    // Alternative solution using Array.fill and Array.map:
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    setDice(generateAllNewDice());
  }

  /** map over dice here */
  const diceElements = dice.map((dieObj) => (
    <Die key={dieObj.id} value={dieObj.value} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      {/*New button here*/}
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
