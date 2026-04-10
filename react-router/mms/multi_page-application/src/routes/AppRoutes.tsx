import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import FeaturesPage from "../pages/FeaturesPage";
import PricingPage from "../pages/PricingPage";
import TeamsPage from "../pages/TeamsPage";
import TeamDetailsPage from "../pages/TeamDetailsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="teams/:id" element={<TeamDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
