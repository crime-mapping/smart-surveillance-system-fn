import { Navigate, Outlet } from "react-router-dom";

export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime; // Check if token is still valid
  } catch (error) {
    return false; // Invalid token format
  }
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
