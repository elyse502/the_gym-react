import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation(); // Hook to get location object
  const { name } = location.state || { name: "Guest" }; // Get the passed name (default to "Guest" if no name)

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {name}</p> {/* Display name */}
    </div>
  );
}
