import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const base = "px-4 py-2 text-sm";
  const active = "font-semibold border-b-2 border-black dark:border-white";

  const navigate = useNavigate();

  return (
    <nav
      className="w-full border-b 
                    bg-white text-black 
                    dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          React Landing Page
        </h1>

        {/* Links */}
        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Features
          </NavLink>

          <NavLink
            to="/pricing"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Pricing
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Teams
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
