import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import { Sun, Moon } from "../../assets";
import { useTheme } from "../../context";
import "./Navigation.css";

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navigation px-2 border-b-2 sticky top-0 z-10 bg-primary-200 pr-8 md:pr-10 lg:pr-12">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="cursor-pointer img-responsive w-24 md:w-32 lg:w-32"
        />
      </Link>
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="search"
          className="rounded px-2 py-1 w-52 lg:w-60"
        />
        <div className="avatar avatar-xs avatar-text cursor-pointer hidden md:flex lg:flex">
          MB
        </div>
        <div className="cursor-pointer" onClick={() => toggleTheme(theme)}>
          {theme === "light" ? <Sun /> : <Moon />}
        </div>
      </div>
    </nav>
  );
};