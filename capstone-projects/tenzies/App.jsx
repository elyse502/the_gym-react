import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  /**
   * Challenge:
   * Log "Game won!" to the console only if the 2 winning
   * conditions are met.
   *
   * 1. all the dice are being held, and
   * 2. all the dice have the same value
   *
   * For now, no need to even save a variable!
   */

  /**
   * Challenge part 2:
   * 1. Create a new `gameWon` variable.
   * 2. If `gameWon` is true, change the button text to
   *    "New Game" instead of "Roll"
   */

  /*if (
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value)
  ) {
    console.log("Game won!");
  }*/

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

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
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
