import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import CategoriesPage from "@/features/categories/pages/CategoriesPage";
import CategoryProductsPage from "@/features/categories/pages/CategoryProductsPage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/categories/:categoryId"
            element={<CategoryProductsPage />}
          />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
