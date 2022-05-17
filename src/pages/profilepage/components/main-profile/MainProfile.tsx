import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./MainProfile.css";
import { getUser } from "../../../../firebase/firebase-firestore";
import {
  AuthSliceState,
  initialState,
} from "../../../../store/auth-action/authSlice";
import { useState, useEffect } from "react";

export const MainProfile = () => {
  const { uid: otherUid } = useParams();
  const [user, setUser] = useState<AuthSliceState>(initialState);
  let tempUser = useSelector((store: any) => store.auth);

  const getUserData = async () => {
    if (otherUid) {
      setUser((await getUser(otherUid)) ?? initialState);
    }
  };

  useEffect(() => {
    if (otherUid) {
      getUserData();
    } else {
      console.log(tempUser);
      setUser(tempUser);
    }
  }, []);

  const { authUser: userData, followersList, followingList, postsList } = user;
  console.log(userData);

  return (
    <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col gap-4 rounded  child:mx-auto mt-2">
      <div className="flex gap-6 items-center">
        <div className={`h-32 w-32 ${otherUid ? "" : "profile-pic"}`}>
          <img
            src={userData?.photoURL || ""}
            alt={userData?.displayName || ""}
            className="img-rounded img-responsive cursor-pointer"
          />
          <div className="profile-overlay">
            <button className="profile-overlay-text">Edit</button>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="large-title text-2xl">{userData?.displayName}</h1>
          </div>
          {otherUid ? (
            <button
              type="button"
              className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base"
            >
              Follow
            </button>
          ) : (
            <button
              type="button"
              className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base"
            >
              Edit Profile
            </button>
          )}

          <Link to="/" className="text-primary-500 text-sm">
            {userData?.email}
          </Link>
        </div>
      </div>
      <div className="flex text-sm gap-8">
        <div className="flex flex-col items-center  cursor-pointer">
          <span>{followersList?.length}</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col items-center  cursor-pointer">
          <span>{followingList?.length}</span>
          <span>Following</span>
        </div>
        <div className="flex flex-col items-center  cursor-pointer">
          <span>{postsList?.length}</span>
          <span>Posts</span>
        </div>
      </div>
      <p className="text-sm md:text-base lg:text-base text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam,
        tenetur.
      </p>
      <hr />
    </div>
  );
};
