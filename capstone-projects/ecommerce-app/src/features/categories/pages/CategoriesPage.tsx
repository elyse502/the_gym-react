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

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading categories...</div>
    );

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-gray-500">Browse products by category</p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden md:block text-sm text-gray-500">
            {user?.email}
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
            className="group cursor-pointer rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="h-36 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-3 text-center">
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
