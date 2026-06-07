import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";
import { selectAuth } from "../store/slices/auth_slice";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Você precisa fazer login para acessar esta página.", {
        toastId: "auth-warning",
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
