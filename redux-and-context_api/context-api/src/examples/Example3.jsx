import React, { useState, createContext, useContext } from "react";

/**
 * In this example, we have a Parent2 component that manages two pieces of state: userName and count.
 * The Parent2 component provides these states and their corresponding setter functions through the AppContext.
 * Child1 and Child3 consume the userName and count values, respectively, while Child2 and Child4 provide buttons to update these values.
 * This demonstrates how multiple components can share and update state using the Context API without prop drilling.
 *
 * But this causes unnecessary re-renders in all the children components whenever any state changes, even if they don't use that state.
 * To optimize this, we can split the context into multiple contexts, each responsible for a specific piece of state.
 * This way, only the components that consume a particular context will re-render when that context's state changes.
 */

const AppContext = createContext(null);

export const Parent2 = () => {
  const [userName, setUserName] = useState("PedroTech");
  const [count, setCount] = useState(0);

  return (
    <AppContext.Provider value={{ userName, setUserName, count, setCount }}>
      <Child1 />
      <Child2 />
      <Child3 />
      <Child4 />
    </AppContext.Provider>
  );
};

export const Child1 = () => {
  const { userName } = useContext(AppContext);

  return <h1>{userName}</h1>;
};

export const Child2 = () => {
  const { setUserName } = useContext(AppContext);

  return (
    <button onClick={() => setUserName("PedroTechnologies")}>
      Change Name
    </button>
  );
};

export const Child3 = () => {
  const { count } = useContext(AppContext);

  return <h1>{count}</h1>;
};

export const Child4 = () => {
  const { setCount } = useContext(AppContext);

  return (
    <button onClick={() => setCount((prevCount) => prevCount + 1)}>
      Increment Count
    </button>
  );
};
