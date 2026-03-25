import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    isPremium,
    setIsPremium,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * In this code, we create a UserContext using React's createContext function.
 * The UserContextProvider component manages the user information, authentication state, and premium status.
 * It provides functions for updating the user information, authentication status, and premium status, which update the state accordingly.
 */

// Example of consuming the UserContext in a child component:

/*
import "./App.css";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <ChildComponent />
      </UserContextProvider>
    </div>
  );
}
*/

// Example of a child component consuming the UserContext:

/*
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function ChildComponent() {
  const { user, isAuth, isPremium } = useContext(UserContext);

  return (
    <div>
      {isAuth ? (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {isPremium && <p>Premium user</p>}
        </div>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}

export default ChildComponent;
*/
