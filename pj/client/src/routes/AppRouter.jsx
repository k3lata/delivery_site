import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import DishesPage from "../pages/Dishes/DishesPage";
import CuisinePage from "../pages/Cuisine/CuisinePage";
import CartPage from "../pages/Cart/CartPage";
import MenuBuilderPage from "../pages/MenuBuilder/MenuBuilderPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import OrdersPage from "../pages/Profile/OrdersPage";
import AdminPage from "../pages/Admin/AdminPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dishes" element={<DishesPage />} />
        <Route path="/cuisine/:cuisineId" element={<CuisinePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu-builder" element={<MenuBuilderPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}