import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/types/product.types";

function CategoryProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<Product[]>(
    "https://api.escuelajs.co/api/v1/products",
  );

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  // Filter products by category
  const filteredProducts = data?.filter(
    (product) => product.category.id === Number(categoryId),
  );

  return (
    <div className="p-4 space-y-4">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="bg-gray-200 px-3 py-1">
        Back
      </button>

      <h1 className="text-xl font-bold">Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="border p-2 cursor-pointer hover:shadow"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-32 w-full object-cover"
            />
            <p className="mt-2 text-center">{product.title}</p>
            <p className="text-center font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProductsPage;
