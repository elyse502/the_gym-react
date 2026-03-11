import { useState, useEffect } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data.slice(0, 200));
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return { products, loading };
}

export default useProducts;
