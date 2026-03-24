import React, { createContext, useState } from "react";

/**
 * An example that would cause the issue of unnecessary re-renders in all the children components whenever any state changes, even if they don't use that state.
 * To optimize this, we can split the context into multiple contexts, each responsible for a specific piece of state.
 * This way, only the components that consume a particular context will re-render when that context's state changes.
 */

export const ProfileContext = createContext(null);

export const ProfileContextProvider = ({ children }) => {
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [listOfFriends, setListOfFriends] = useState([]);
  const [newProfileInfo, setNewProfileInfo] = useState(userProfileInfo);

  const value = {
    userProfileInfo,
    setUserProfileInfo,
    isOpenUpdateModal,
    setIsOpenUpdateModal,
    listOfFriends,
    setListOfFriends,
    newProfileInfo,
    setNewProfileInfo,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContext;

/**
 * In this code, we create a ProfileContext using React's createContext function.
 * The ProfileContextProvider component manages the user profile information and authentication state.
 * It provides functions for updating the profile information and opening/closing the update modal, which update the state accordingly.
 *  The context value includes the user profile information, authentication status, and the update profile functions, making it accessible to any component that consumes this context.
 *
 * To use this ProfileContext in your application, you would wrap your component tree with the ProfileContextProvider,
 * and then consume the context in any child component using the useContext hook.
 */

// Note: The fetch calls in the update functions are placeholders.
// In a real application, you would replace them with actual API calls to your backend for updating the profile information.

/**
 * To use this ProfileContext in your application, you would wrap your component tree with the ProfileContextProvider,
 * and then consume the context in any child component using the useContext hook.
 */

// Example of consuming the ProfileContext in a child component:

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
import { ProfileContext } from "./context/ProfileContextProvider";

function ChildComponent() {
  const { userProfileInfo, isOpenUpdateModal } = useContext(ProfileContext);

  return (
    <div>
      <p>{userProfileInfo.name}</p>
      <p>{userProfileInfo.email}</p>
      {isOpenUpdateModal && <p>Update Modal is open</p>}
    </div>
  );
}

export default ChildComponent;
*/
