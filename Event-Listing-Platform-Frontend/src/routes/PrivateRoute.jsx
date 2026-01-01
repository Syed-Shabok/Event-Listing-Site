import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../lib/store/useAuthStore";

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();
  console.log("Check Authentication: ", isAuthenticated);
  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
