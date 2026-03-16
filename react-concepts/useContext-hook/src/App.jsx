import React, { createContext, useState, useContext } from "react";

/**
 * ThemeContext
 * ------------
 * This context will hold the current theme ('light' or 'dark')
 * and a function to toggle the theme.
 * Any component wrapped by ThemeProvider can access this context
 * using the useContext hook.
 */
const ThemeContext = createContext();

/**
 * ThemeProvider component
 * -----------------------
 * This component is responsible for:
 * 1. Storing the current theme state using useState.
 * 2. Providing a toggleTheme function to switch between light and dark themes.
 * 3. Wrapping its children with ThemeContext.Provider so they can access the theme.
 */
const ThemeProvider = ({ children }) => {
  // State to store the current theme
  const [theme, setTheme] = useState("light");

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Provide the theme and toggle function to all child components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * ThemedContent component
 * -----------------------
 * This component consumes the ThemeContext to:
 * 1. Read the current theme.
 * 2. Call toggleTheme when the button is clicked.
 * 3. Dynamically apply styles based on the theme.
 */
const ThemedContent = () => {
  // Consume the context to get current theme and toggle function
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Inline styles based on current theme
  const style = {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };

  return (
    <div style={style}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

/**
 * App component
 * -------------
 * The root component of the application.
 * Wraps ThemedContent with ThemeProvider so that the theme context
 * is available to all children.
 */
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <ThemedContent />
      </ThemeProvider>
    </div>
  );
};

export default App;
