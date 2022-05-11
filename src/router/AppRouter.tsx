import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};
