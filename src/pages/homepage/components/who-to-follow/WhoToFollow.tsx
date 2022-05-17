import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { WhoToFollowCard } from "./WhoToFollowCard";
export const WhoToFollow = () => {
  // const data = new Array(5).fill({
  //   name: "Dwight Schrute",
  //   avatar: "https://i.pravatar.cc/300?img=8",
  // });
  const { authUser } = useSelector((store: IRootState) => store.auth);
  const { allUsers } = useSelector((store: IRootState) => store.allUsers);
  const filteredUsers = allUsers?.filter((user) => user.uid !== authUser?.uid);
  return (
    <div className="w-1/5 dark:bg-gray-800 relative rounded-md  mx-2 hidden md:flex lg:flex who-to-follow">
      <div className="overflow-y-auto p-3 md:py-4 lg:py-4 bg-gray-50 dark:bg-gray-800 rounded sticky top-20 w-full">
        <p className="dark:text-white transition duration-75 text-base font-normal text-center">
          Who to follow?
        </p>
        <div>
          {filteredUsers?.map((user) => (
            <WhoToFollowCard
              key={user.uid}
              photoURL={user.photoURL}
              displayName={user.displayName}
              uid={user.uid}
            />
            // <div className="flex items-center px-2 w-full rounded hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            //   <img
            //     src={photoURL ?? ""}
            //     alt="user"
            //     className="avatar avatar-xs"
            //   />
            //   <p className="text-sm text-gray-200">{displayName}</p>
            //   <button className="text-base text-primary-500 hover:text-primary-200 ml-auto">
            //     Follow
            //   </button>
            //   {/* <button className="text-base text-gray-500 hover:text-primary-200 ml-auto">
            //     Unfollow
            //   </button> */}
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};
