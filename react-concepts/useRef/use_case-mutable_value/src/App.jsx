/**
 * useRef can be used to store a mutable value that does not cause a re-render when updated.
 * In this example, we use useRef to keep track of the number of renders without causing the
 * component to re-render every time the count is updated.
 */
import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [name, setName] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          React useRef Demo
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Name: <span className="text-blue-500">{name}</span>
        </h2>
        <h2 className="text-lg font-medium text-gray-700">
          Renders: <span className="text-green-500">{count.current}</span>
        </h2>
      </div>
    </div>
  );
};

export default App;
