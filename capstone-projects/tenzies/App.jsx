import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  // check if the game is won

  /**
   * Critical thinking time!
   *
   * We want to indicate to the user that the game is over
   * if (1) all the dice are held, and (2) all the dice have
   * the same value.
   *
   * How might we do this? Some questions to consider:
   *
   * 1. Do we need to save a `gameWon` value in state? If so, why?
   *    If not, why not?
   * No.
   *
   *
   * 2. Do we need to create a side effect to synchronize the `gameWon`
   *    value (whether it's in state or not) with the current state of
   *    the dice?
   * No.
   *
   *
   * Conclusion:
   * We can derive the gameWon status based on the condition(s) of the current
   * dice state on every render.
   */

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
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
      ),
    );
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
