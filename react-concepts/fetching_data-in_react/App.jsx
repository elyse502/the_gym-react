import React from "react";

export default function App() {
  const [starWarsData, setStarWarsData] = React.useState({});
  const [count, setCount] = React.useState(1);

  /**
   * Challenge part 2:
   * Combine the "count" state with the request URL
   * so that pressing the "Get next character" button
   * will get a new character from the Star Wars API.
   * Remember to consider the dependencies array!
   */

  React.useEffect(() => {
    fetch(`https://swapi.dev/api/people/${count}`)
      .then((res) => res.json())
      .then((data) => setStarWarsData(data));
  }, [count]);

  return (
    <div>
      <h2>The count is {count}</h2>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Get next character
      </button>
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
    </div>
  );
}
