import React, { useState, createContext, useContext } from "react";

const AppContext = createContext(null);

const App = () => {
  const [userName, setUserName] = useState("John Doe");

  return (
    <AppContext.Provider value={{ userName, setUserName }}>
      <div className="container">
        <h1>Context API</h1>
        <p>{userName}</p>

        <Child />
      </div>
    </AppContext.Provider>
  );
};

export const Child = () => {
  return <Grandchild />;
};

export const Grandchild = () => {
  const { setUserName } = useContext(AppContext);

  return (
    <div>
      <button onClick={() => setUserName("Jane Doe")}>Change Name</button>
    </div>
  );
};

export default App;
