import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)} // Update state with input
      />
      <button
        onClick={
          () => navigate("/profile", { state: { name: inputName || "Prisca" } }) // Pass input name or default to "Prisca"
        }
      >
        Go to Profile
      </button>
    </div>
  );
}
