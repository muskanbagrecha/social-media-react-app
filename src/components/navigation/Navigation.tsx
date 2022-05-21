import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import { User as UserIcon, Logout } from "../../assets";
import { useSelector } from "react-redux";
import { SearchBar } from "../searchbar/SearchBar";
import "./Navigation.css";
import { IRootState } from "../../store/store";
import { logoutHandler } from "../../firebase/firebaseAuth";

export const Navigation: React.FC = () => {
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
        <SearchBar />
        {authUser ? (
          <div
            className="avatar avatar-xs  cursor-pointer hidden md:flex lg:flex"
            onClick={() => navigate(`/profile/${authUser?.uid}`)}
            title="profile"
          >
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
            <UserIcon />
          </div>
        )}
        <div className="cursor-pointer">
          <button onClick={logoutHandler}>{authUser && <Logout />}</button>
        </div>
      </div>
    </nav>
  );
};
