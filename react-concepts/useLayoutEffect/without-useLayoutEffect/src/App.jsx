import { useState, useEffect } from "react";

const App = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log("useEffect");
  }, [toggle]);

  return (
    <div className="text-center pt-10">
      <button
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
      {toggle && <h4>Code Sandbox. Learn React</h4>}
    </div>
  );
};

export default App;
