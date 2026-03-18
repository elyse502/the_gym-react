import React from "react";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ChangeColor from "./components/ChangeColor";

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen max-w-full">
      <Profile />
      <Login />
      <ChangeColor />
    </div>
  );
};

export default App;
