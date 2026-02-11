import { useState } from "react";
import Die from "./components/Die";

/**
 * Challenge: Create a `Roll Dice` button that will re-roll
 * all 10 dice
 *
 * Clicking the button should generate a new array of numbers
 * and set the `dice` state to that new array (thus re-rendering
 * the array to the page)
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
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  function rollDice() {
    setDice(generateAllNewDice());
  }

  /** map over dice here */
  const diceElements = dice.map((num) => <Die value={num} />);

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      {/*New button here*/}
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}
