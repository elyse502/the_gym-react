import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/user";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({ name: "John Doe", age: 30, email: "john.doe@example.com" }),
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button
        className="border rounded-2xl px-12 py-2 bg-blue-400 cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>

      <button
        className="border rounded-2xl px-12 py-2 bg-red-400 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Login;
