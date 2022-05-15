import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  Profilepage,
  Bookmarkpage,
  Likespage,
  Loginpage,
  Signuppage,
  Explorepage,
  Otherprofilepage,
} from "../pages";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "../components";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Private routes for authenticated users */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/profile/:username" element={<Profilepage />} />
        <Route path="/bookmark" element={<Bookmarkpage />} />
        <Route path="/likes" element={<Likespage />} />
      </Route>

      {/* Private routes for unauthenticated users */}
      <Route element={<UnauthenticatedRoutes />}>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />}></Route>
      </Route>

      {/* Other public routes */}
      <Route path="/profile/:username" element={<Otherprofilepage />} />
      <Route path="/explore" element={<Explorepage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

{
  /* <Route element={<PrivateRoute />}>
<Route path='/my-profile' element={<ProfilePage />} />
<Route path='/bookmark' element={<BookmarkPage />} />
<Route path='/likes' element={<LikedPostPage />} />
</Route> */
}

// const PrivateRoute = () => {
// 	const { authUser } = useAuth();
// 	const location = useLocation();
// 	return authUser ? <Outlet /> : <Navigate to='/auth' state={{ from: location }} replace />;
// };

{
  /* <Route element={<RestrictedRoute />}>
<Route path='/auth' element={<Auth />} />
</Route> */
}

// const RestrictedRoute = (second) => {
// 	const { authUser } = useAuth();

// 	const location = useLocation();
// 	return authUser ? <Navigate to={location.state?.from?.pathname ?? '/'} state={{ from: location }} replace /> : <Outlet />;
// };
