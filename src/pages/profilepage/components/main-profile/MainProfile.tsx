import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./MainProfile.css";
import {
  editUserProfileImage,
  getCollectionsSize,
  followUser,
  unfollowUser,
  initiateChat,
} from "../../../../firebase/firebase-firestore";
import { useState, useEffect } from "react";
import {
  User,
  setPhotoURL,
  setIsLoading,
} from "../../../../store/auth-action/authSlice";
import { AllPosts } from "../all-posts/AllPosts";
import { openModal } from "../../../../store/modal-action/modalSlice";
import { PostInterface } from "../../../../store/posts-action/allPosts";

//TODO: fix profile pagelayout
export const MainProfile = () => {
  const { uid: otherUid } = useParams();
  const dispatch = useDispatch();
  const { authUser, followersList, followingList } = useSelector(
    (store: any) => store.auth
  );
  const { allUsers } = useSelector((store: any) => store.allUsers);
  const { allPosts } = useSelector((store: any) => store.allPosts);

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    bio: "",
    displayName: "",
    photoURL: "",
    portfolio: "",
    followers: 0,
    followings: 0,
    uid: "",
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const currentUserPost = allPosts.filter((post: PostInterface) => {
      return post?.uid === otherUid;
    }, []);

    setPosts(currentUserPost);
    if (otherUid && allUsers) {
      if (otherUid === authUser?.uid) {
        setCurrentUser((prev) => ({
          ...prev,
          bio: authUser.bio,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
          portfolio: authUser.portfolio,
        }));
      } else {
        const currentUser = allUsers.find(
          (user: User) => user?.uid === otherUid
        );
        currentUser && setCurrentUser(currentUser);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts, otherUid, allUsers, authUser]);

  useEffect(() => {
    if (otherUid) {
      setIsFollowing(
        followingList?.findIndex(
          (following: { id: string }) => following.id === otherUid
        ) === -1
          ? false
          : true
      );
      if (otherUid !== authUser?.uid) {
        getUserMetaData();
      } else if (otherUid === authUser?.uid) {
        setCurrentUser((prev) => ({
          ...prev,
          followers: followersList.length,
          followings: followingList.length,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUid, followingList]);

  const getUserMetaData = async () => {
    const followers =
      (await getCollectionsSize(`users/${otherUid}/followers`)) ?? [];
    const followings =
      (await getCollectionsSize(`users/${otherUid}/following`)) ?? [];
    setCurrentUser((prev) => ({ ...prev, followers, followings }));
  };

  const followHandler = async (currentUserId: string, toFollowId: string) => {
    if (authUser) {
      await followUser(currentUserId, toFollowId);
    } else {
      navigate("/login");
    }
  };

  const unfollowingHandler = async (
    currentUserId: string,
    toUnfollowId: string
  ) => {
    if (authUser) {
      await unfollowUser(currentUserId, toUnfollowId);
    } else {
      navigate("/login");
    }
  };

  const changeImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsLoading(true));
    let files = e.target.files;
    const newUrl = await editUserProfileImage(
      authUser.uid,
      files ? files[0] : null
    );
    if (newUrl) {
      dispatch(setPhotoURL({ ...authUser, photoURL: newUrl }));
    }
    dispatch(setIsLoading(false));
  };

  const chatClickHandler = async (otherUid: string | undefined) => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    await initiateChat(authUser.uid, otherUid);
    navigate(`/chat`);
  };

  const { bio, displayName, photoURL, uid, portfolio, followers, followings } =
    currentUser;

  return (
    <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col gap-4 rounded child:mx-auto mt-2 main-feed">
      <div className="flex gap-6 items-center">
        <div
          className={`h-32 w-32 relative ${
            otherUid !== authUser?.uid ? "" : "profile-pic"
          }`}
        >
          <img
            src={photoURL || ""}
            alt={displayName || ""}
            className="img-rounded img-responsive cursor-pointer"
          />

          {otherUid === authUser?.uid && (
            <div className="profile-overlay ">
              <label
                htmlFor="edit-profile"
                className="profile-overlay-text cursor-pointer"
              >
                Edit
                <input
                  id="edit-profile"
                  type="file"
                  accept="image/*"
                  onChange={changeImageHandler}
                  className="bg-primary-200 hidden"
                />
              </label>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="large-title text-2xl">{displayName}</h1>
          </div>
          {otherUid &&
            (otherUid !== authUser?.uid ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base w-24"
                  onClick={() => {
                    if (isFollowing) {
                      unfollowingHandler(authUser?.uid, uid);
                    } else {
                      followHandler(authUser.uid, otherUid);
                    }
                  }}
                >
                  {authUser ? (isFollowing ? "Unfollow" : "Follow") : "Follow"}
                </button>
                <button
                  className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base w-24"
                  onClick={() => chatClickHandler(otherUid)}
                >
                  Chat
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => dispatch(openModal("EditProfile"))}
                className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base"
              >
                Edit Profile
              </button>
            ))}
          <a
            href={portfolio}
            className="text-primary-500 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            {portfolio}
          </a>
        </div>
      </div>
      <div className="flex text-sm gap-8">
        <div className="flex flex-col items-center  cursor-pointer">
          <span>{followers}</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col items-center  cursor-pointer">
          <span>{followings}</span>
          <span>Following</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <span>{posts.length}</span>
          <span>Posts</span>
        </div>
      </div>
      <p className="text-sm md:text-base lg:text-base text-center">{bio}</p>
      <AllPosts userId={otherUid ?? ""} />
    </div>
  );
};
