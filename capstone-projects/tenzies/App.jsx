import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  /**
   * Challenge: Create a function `hold` that takes
   * `id` as a parameter. For now, just have the function
   * console.log(id).
   *
   * Then, figure out how to pass that function down to each
   * instance of the Die component so when each one is clicked,
   * it logs its own unique ID property. (Hint: there's more
   * than one way to make that work, so just choose whichever
   * you want)
   */

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

  function hold(id) {
    console.log(id);
  }

  /** map over dice here */
  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      // hold={hold}
      // id={dieObj.id}
      hold={() => hold(dieObj.id)}
    />
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
