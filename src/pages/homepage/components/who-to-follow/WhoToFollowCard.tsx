import {
  followUser,
  unfollowUser,
} from "../../../../firebase/firebase-firestore";
import { useDispatch, useSelector } from "react-redux";
import PropTypes, { InferProps } from "prop-types";
import { useNavigate } from "react-router-dom";

export function WhoToFollowCard({
  photoURL,
  displayName,
  uid,
}: InferProps<typeof WhoToFollowCard.propTypes>) {
  const dispatch = useDispatch();
  const { authUser, followingList } = useSelector((store: any) => store.auth);
  const isFollowing = followingList?.find((user: any) => user.id === uid);
  let navigate = useNavigate();
  return (
    <div
      className="flex items-center px-1 w-full rounded hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => {
        navigate("/profile/" + uid);
      }}
    >
      <img src={photoURL ?? ""} alt="user" className="avatar avatar-xs" />
      <p className="text-sm text-gray-200 line-clamp-1">{displayName}</p>
      {!isFollowing ? (
        <button
          className="text-base text-primary-500 hover:text-primary-200 ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            authUser
              ? followUser(authUser.uid, uid ?? "", dispatch)
              : navigate("/login");
          }}
        >
          Follow
        </button>
      ) : (
        <button
          className="text-base text-gray-500 hover:text-primary-200 ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            unfollowUser(authUser.uid, uid ?? "", dispatch);
          }}
        >
          Unfollow
        </button>
      )}
    </div>
  );
}

WhoToFollowCard.propTypes = {
  photoURL: PropTypes.string,
  displayName: PropTypes.string,
  uid: PropTypes.string,
};
