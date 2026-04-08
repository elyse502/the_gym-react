import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/types/product.types";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<Product>(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
  );

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  if (!data) return <p className="p-4">Product not found</p>;

  return (
    <div className="p-4 space-y-4">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="bg-gray-200 px-3 py-1">
        Back
      </button>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <img
          src={data.images[0]}
          alt={data.title}
          className="w-full h-80 object-cover"
        />

        {/* Details */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{data.title}</h1>

          <p className="text-lg font-semibold">${data.price}</p>

          <p className="text-gray-600">{data.description}</p>

          <p className="text-sm">
            Category: <span className="font-medium">{data.category.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
