import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <button
        onClick={logout}
        className="px-4 py-2 rounded-md 
                   bg-red-500 text-white cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
