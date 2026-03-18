import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../features/theme";

const ChangeColor = () => {
  const [color, setColor] = useState("");

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const colorChange = () => {
    dispatch(changeColor(color));
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleColorChange}
        className="border rounded px-4 py-2"
      />
      <button
        className="border rounded-2xl px-12 py-2 bg-blue-400 cursor-pointer"
        onClick={colorChange}
      >
        CHANGE COLOR
      </button>
    </div>
  );
};

export default ChangeColor;
