import { useSelector } from "react-redux";
import { WhoToFollowCard } from "../../../homepage/components";
import "./YourFollowers.css";
export const YourFollowers = () => {
  const { followersList } = useSelector((store: any) => store.auth);
  const { allUsers } = useSelector((store: any) => store.allUsers);
  return (
    <nav className="w-1/5 dark:bg-gray-800 relative rounded-md mx-2 hidden md:flex lg:flex who-to-follow your-followers-section">
      <div className="overflow-y-auto p-3 md:py-4 lg-py-4 bg-gray-50 dark:bg-gray-800">
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
