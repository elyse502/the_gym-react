import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    fetch("/login").then((res) => {
      setIsAuth(true);
      setUserInfo(res.user);
    });
  };

  const logout = () => {
    fetch("/logout").then((res) => {
      setIsAuth(false);
      setUserInfo(null);
    });
  };

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

/**
 * In this code, we create a UserContext using React's createContext function.
 * The UserContextProvider component manages the user information and authentication state.
 * It provides functions for logging in and logging out, which update the state accordingly.
 *  The context value includes the user information, authentication status, and the login/logout functions,
 * making it accessible to any component that consumes this context.
 */

// Note: The fetch calls in the login and logout functions are placeholders.
// In a real application, you would replace them with actual API calls to your backend for authentication.

/**
 * To use this UserContext in your application, you would wrap your component tree with the UserContextProvider,
 * and then consume the context in any child component using the useContext hook.
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
import React, { useContext } from "react";
import UserContext from "./UserContext";

const ChildComponent = () => {
  const { userInfo, isAuth } = useContext(UserContext);

  return (
    <div>
      {isAuth ? (
        <div>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
        </div>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
};

export default ChildComponent;
*/
