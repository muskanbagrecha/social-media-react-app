import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
export const AuthenticatedRoutes = () => {
  const { authUser } = useSelector((store: IRootState) => store.auth);
  const location = useLocation();
  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
