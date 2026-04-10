import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/types/product.types";
import ThemeToggle from "@/components/ui/ThemeToggle";

function CategoryProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<Product[]>(
    "https://api.escuelajs.co/api/v1/products",
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading products...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  const filteredProducts = data?.filter(
    (product) => product.category.id === Number(categoryId),
  );

  if (!filteredProducts?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="relative flex items-center justify-between border-b pb-4">
        {/* Left */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm 
               bg-white text-black 
               dark:bg-gray-800 dark:text-white dark:border-gray-600
               hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          ← Back
        </button>

        {/* Center */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold tracking-tight">
          Products
        </h1>

        {/* Right */}
        <ThemeToggle />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="group cursor-pointer rounded-xl overflow-hidden border 
                       hover:shadow-lg transition hover:-translate-y-1"
          >
            {/* Image */}
            <div className="h-40 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-3 space-y-1 text-center">
              <p className="text-sm font-medium line-clamp-2">
                {product.title}
              </p>

              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductsPage;
