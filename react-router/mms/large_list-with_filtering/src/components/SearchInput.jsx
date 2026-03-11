import { useState } from "react";

function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  }

  return (
    <input
      type="text"
      placeholder="Search products"
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchInput;
