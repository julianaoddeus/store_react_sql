import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./protected-route";
import Layout from "../_components/Layout";
import Home from "../pages/home";
import Register from "../pages/register";
import Login from "../pages/login";
import { Courses } from "../pages/courses";
import ProductDetailPage from "../pages/courses-datails";
import EnrollmentPage from "../pages/enrollment";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<ProductDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/courses/enrollment" element={<EnrollmentPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
