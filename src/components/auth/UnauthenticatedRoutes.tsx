import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

export const UnauthenticatedRoutes: React.FC = () => {
  const location = useLocation();
  const { authUser } = useSelector((store: IRootState) => store.auth);
  interface LocationState {
    from: Location;
  }
  const state = location.state as LocationState;

  return (
    <div>
      {authUser ? (
        <Navigate
          to={state?.from?.pathname ?? "/"}
          state={{ from: location }}
          replace
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
