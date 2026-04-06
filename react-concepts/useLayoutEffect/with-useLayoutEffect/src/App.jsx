/**
 * useLayoutEffect is a React hook that is similar to useEffect but it runs synchronously after all DOM mutations.
 * It is used for performing side effects that require immediate DOM updates, such as measuring the layout of elements
 * or synchronizing with external libraries that manipulate the DOM.
 *
 * The main difference between useLayoutEffect and useEffect is that useLayoutEffect runs synchronously after all DOM mutations,
 * while useEffect runs asynchronously after the browser has painted the screen. This means that if you need to perform side
 * effects that require immediate DOM updates, you should use useLayoutEffect instead of useEffect.
 *
 * In the provided code snippet, useLayoutEffect is used to measure the dimensions of a text element and update its padding
 * based on its height. This ensures that the layout is updated immediately after the DOM changes, preventing any visual
 * glitches or delays that may occur with useEffect.
 *
 * Additionally, there are two console.log statements to demonstrate the order of execution of useLayoutEffect and useEffect.
 * When the toggle state changes, "useLayoutEffect" will be logged before "useEffect", indicating that useLayoutEffect runs
 * synchronously before the browser paints the screen.
 */
import { useRef } from "react";
import { useState, useEffect, useLayoutEffect } from "react";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const textRef = useRef();

  useLayoutEffect(() => {
    if (textRef.current != null) {
      const dimension = textRef.current.getBoundingClientRect();
      textRef.current.style.paddingTop = `${dimension.height}px`;
    }
  }, [toggle]);

  useEffect(() => {
    console.log("useEffect");
  }, [toggle]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, [toggle]);

  return (
    <div className="text-center pt-10">
      <button
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
      {toggle && <h4 ref={textRef}>Code Sandbox. Learn React</h4>}
    </div>
  );
};

export default App;
