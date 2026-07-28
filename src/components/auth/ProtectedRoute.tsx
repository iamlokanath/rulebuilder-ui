import { useApp } from "@/context/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
  const { token } = useApp();
  const location = useLocation();
  if (!token) {
    const next = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
  }
  return <Outlet />;
}
