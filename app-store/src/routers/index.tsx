import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./protected-route";
import Layout from "../_components/Layout";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import Products from "../pages/products";
import ProductDetailPage from "../pages/product-datails";
import CartPage from "../pages/cart";
import CoursesPage from "../pages/courses";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:documentId" element={<ProductDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
