import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/types/product.types";
import { useState } from "react";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<Product>(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading product...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  const images = data.images?.length ? data.images : [];
  const mainImage = selectedImage || images[0];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border text-sm 
                     bg-white text-black 
                     dark:bg-gray-800 dark:text-white dark:border-gray-600
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Back
        </button>

        <h1 className="text-lg font-semibold">Product Details</h1>

        <div />
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="w-full h-80 rounded-xl overflow-hidden border">
            <img
              src={mainImage}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 w-20 object-cover rounded-md cursor-pointer border 
                    ${mainImage === img ? "border-black dark:border-white" : "border-gray-300"}
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{data.title}</h1>

          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${data.price}
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {data.description}
          </p>

          <p className="text-sm">
            Category: <span className="font-medium">{data.category.name}</span>
          </p>

          {/* Action Button */}
          <button
            className="mt-4 w-full md:w-auto px-6 py-2 rounded-md cursor-pointer
                       bg-white text-black 
                     dark:bg-gray-800 dark:text-white dark:border-gray-600
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
