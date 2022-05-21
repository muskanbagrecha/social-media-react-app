import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  Profilepage,
  Bookmarkpage,
  Likespage,
  Loginpage,
  Signuppage,
  Explorepage,
  // Otherprofilepage,
} from "../pages";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "../components";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Private routes for authenticated users */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/bookmark" element={<Bookmarkpage />} />
        <Route path="/likes" element={<Likespage />} />
      </Route>

      {/* Private routes for unauthenticated users */}
      <Route element={<UnauthenticatedRoutes />}>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />}></Route>
      </Route>

      {/* Other public routes */}
      <Route path="/profile/:uid" element={<Profilepage />} />
      <Route path="/explore" element={<Explorepage />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};
