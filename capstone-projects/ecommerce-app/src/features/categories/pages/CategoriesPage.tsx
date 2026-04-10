import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/types/category.types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useState, useMemo } from "react";

function CategoriesPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetch<Category[]>(
    "https://api.escuelajs.co/api/v1/categories",
  );

  const filteredCategories = useMemo(() => {
    if (!data) return [];

    return data.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading categories...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse products by category
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md border outline-none text-sm
                       bg-white text-black 
                       dark:bg-gray-800 dark:text-white dark:border-gray-600
                       focus:ring-2 focus:ring-black dark:focus:ring-white"
          />

          <ThemeToggle />

          {/* User Info */}
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />

            <span className="text-sm font-medium hidden sm:block">
              {user?.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="px-4 py-2 text-sm rounded-md 
                       bg-red-500 text-white 
                       hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center text-gray-500">No categories found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredCategories.map((category) => (
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
      )}
    </div>
  );
}

export default CategoriesPage;
