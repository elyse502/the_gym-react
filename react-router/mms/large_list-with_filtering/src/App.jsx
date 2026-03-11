import { useState, useMemo, useCallback } from "react";
import useProducts from "./hooks/useProducts";
import SearchInput from "./components/SearchInput";
import ProductList from "./components/ProductList";

function App() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <SearchInput onSearch={handleSearch} />
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
