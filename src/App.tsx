import { Navigation } from "./components";
import { AppRouter } from "./router/AppRouter";

export const App: React.FC = () => {
  return (
    <div className="">
      <Navigation />
      <AppRouter />
    </div>
  );
};
