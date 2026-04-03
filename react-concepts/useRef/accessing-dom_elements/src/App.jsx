/**
 * In this example, we see how to use the useRef hook to access and manipulate a DOM element directly.
 * We create a reference to an input element using useRef, and when the button is clicked, we log the
 * current value of the input element, change its width, and set focus to it.
 *
 * This demonstrates how useRef can be used to interact with DOM elements without causing re-renders,
 * as the reference does not trigger a component update when its value changes.
 *
 * Note: In a real application, you should be cautious when manipulating DOM elements directly, as it can
 * lead to unexpected behavior if not done carefully. Always consider if there is a more "React way" to achieve
 * the same result before resorting to direct DOM manipulation.
 */
import React, { useRef } from "react";

const App = () => {
  const inputEle = useRef();

  const handleClick = () => {
    console.log(inputEle);
    console.log(inputEle.current);

    inputEle.current.style.width = "300px";
    inputEle.current.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          useRef DOM Example
        </h1>

        <input
          type="text"
          ref={inputEle}
          placeholder="Type something..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />

        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        >
          Click Here
        </button>
      </div>
    </div>
  );
};

export default App;
