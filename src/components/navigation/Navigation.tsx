import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import { User, Logout } from "../../assets";
import { useTheme } from "../../context";
import { useSelector } from "react-redux";
import "./Navigation.css";
import { IRootState } from "../../store/store";
import { logoutHandler } from "../../firebase/firebaseAuth";

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { authUser } = useSelector((store: IRootState) => store.auth);
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
          className="rounded-sm px-2 py-1 w-52 lg:w-60"
        />
        {authUser ? (
          <div
            className="avatar avatar-xs avatar-text cursor-pointer hidden md:flex lg:flex"
            onClick={() => navigate("/profile/me")}
            title="profile"
          >
            {/* {authUser?.displayName?.slice(0, 1)} */}
            <img
              src={authUser.photoURL ?? ""}
              alt={authUser.displayName ?? "profile"}
              className="img-rounded img-responsive"
            />
          </div>
        ) : (
          <div
            className="cursor-pointer"
            title="login"
            onClick={() => navigate("/login")}
          >
            <User />
          </div>
        )}
        <div
          className="cursor-pointer"
          onClick={(): void => toggleTheme(theme)}
        >
          {/* {theme === "light" ? <Sun /> : <Moon />} */}
          <button onClick={logoutHandler}>{authUser && <Logout />}</button>
        </div>
      </div>
    </nav>
  );
};
