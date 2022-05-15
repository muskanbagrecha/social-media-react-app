import { Outlet, Navigate, useLocation } from "react-router-dom";
export const AuthenticatedRoutes = () => {
  // 	const { authUser } = useAuth();
  const location = useLocation();
  const authUser = true;
  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
