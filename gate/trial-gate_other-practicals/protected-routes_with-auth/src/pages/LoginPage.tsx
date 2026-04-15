import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-2 rounded-md 
                   bg-white text-black 
                   dark:bg-black dark:text-white cursor-pointer"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
