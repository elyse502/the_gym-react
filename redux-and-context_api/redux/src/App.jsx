import React from "react";
import Profile from "./components/Profile";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <Profile />
      <Login />
    </div>
  );
};

export default App;
