import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { isValidEmail } from "@/utils/validators";
import type { User } from "@/types/auth.types";
import ThemeToggle from "@/components/ui/ThemeToggle";

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/categories" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("All fields are required");
    }

    if (!isValidEmail(email)) {
      return setError("Invalid email format");
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://api.escuelajs.co/api/v1/users");
      const users: User[] = await res.json();

      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!foundUser) {
        return setError("Invalid credentials");
      }

      login(foundUser);
      navigate("/categories", { replace: true });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Top Right Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md p-6 rounded-xl border shadow-sm 
                      bg-white text-black 
                      dark:bg-gray-900 dark:text-white dark:border-gray-700"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Login to continue shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border outline-none
                         bg-white text-black 
                         dark:bg-gray-800 dark:text-white dark:border-gray-600
                         focus:ring-2 focus:ring-black dark:focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md border outline-none
                         bg-white text-black 
                         dark:bg-gray-800 dark:text-white dark:border-gray-600
                         focus:ring-2 focus:ring-black dark:focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md cursor-pointer 
                       bg-black text-white 
                       dark:bg-white dark:text-black
                       hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-xs text-gray-400 text-center">
            Use any valid user from API 👉{" "}
            <a
              className="text-red-500"
              href="https://api.escuelajs.co/api/v1/users"
              target="_blank"
              rel="noopener noreferrer"
            >
              via API
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
