import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../store/auth-action/authSlice";
export const SearchBar = () => {
  const { allUsers } = useSelector((store: any) => store.allUsers);
  const [search, setSearch] = useState("");
  const searchedData =
    search !== ""
      ? allUsers.filter((user: User) =>
          user?.displayName?.toLowerCase().includes(search.toLowerCase())
        )
      : allUsers;
  const navigate = useNavigate();
  return (
    <div className="searchbar-holder">
      <input
        type="search"
        placeholder="search"
        className="rounded-sm px-2 py-1 w-52 lg:w-60"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="search-data">
        {searchedData.map((user: User) => {
          return (
            <div
              key={user.uid}
              onClick={() => {
                navigate("/profile/" + user.uid);
              }}
            >
              <img
                src={user.photoURL ?? ""}
                alt={user.displayName ?? ""}
                className="img-responsive img-rounded"
              />
              <p className="line-clamp-1">{user.displayName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
