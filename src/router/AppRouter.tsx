import { Routes, Route } from "react-router-dom";
import { Homepage, Profilepage } from "../pages";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profilepage />} />
    </Routes>
  );
};
