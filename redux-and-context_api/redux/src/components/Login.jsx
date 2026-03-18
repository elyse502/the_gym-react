import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({ name: "John Doe", age: 30, email: "john.doe@example.com" }),
    );
  };

  return (
    <div>
      <button
        className="border rounded-2xl px-12 py-2 bg-blue-400 cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
