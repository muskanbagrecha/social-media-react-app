import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../store/modal-action/modalSlice";
import { Plus } from "../../../../assets";
import { WhoToFollowCard } from "../../../homepage/components";

export const UserFollowers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, followersList } = useSelector((store: any) => store.auth);
  const { allUsers } = useSelector((store: any) => store.allUsers);
  const createPostHandler = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    dispatch(openModal("CreatePostsCard"));
  };
  return (
    <nav className="dark:bg-gray-800 relative rounded-md mx-2 md:w-1/5 lg:w-1/5 feed-navigation">
      <div className="create-icon avatar avatar-xs" onClick={createPostHandler}>
        <Plus />
      </div>
      <div className="overflow-y-auto p-3 md:py-4 lg-py-4 bg-gray-50 dark:bg-gray-800 rounded sticky top-20 all-user-div">
        <p className="dark:text-white transition duration-75 text-base font-normal text-center">
          Your followers
        </p>
        <div>
          {followersList?.map((user: { id: string }) => {
            const currentUser = allUsers?.find((profile: any) => {
              return profile.uid === user.id;
            });
            const { photoURL, displayName, uid } = currentUser ?? {
              photoURL: "",
              displayName: "",
              uid: "",
            };
            return (
              <WhoToFollowCard
                key={uid}
                photoURL={photoURL}
                displayName={displayName}
                uid={uid}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
};
