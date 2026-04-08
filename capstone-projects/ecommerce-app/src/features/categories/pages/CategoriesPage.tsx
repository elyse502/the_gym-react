import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/types/category.types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

function CategoriesPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { data, loading, error } = useFetch<Category[]>(
    "https://api.escuelajs.co/api/v1/categories",
  );

  if (loading) return <p className="p-4">Loading categories...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-4 bg-white text-black dark:bg-black dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Categories</h1>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <span>{user?.email}</span>

          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="bg-red-500 text-white px-3 py-1"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
            className="border p-2 cursor-pointer hover:shadow"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-32 w-full object-cover"
            />
            <p className="mt-2 text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
