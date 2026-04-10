import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import CategoriesPage from "@/features/categories/pages/CategoriesPage";
import CategoryProductsPage from "@/features/categories/pages/CategoryProductsPage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/features/404/NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/categories" replace />} />
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

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
