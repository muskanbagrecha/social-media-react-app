import { FeedNavigation, WhoToFollow } from "../homepage/components";
import { MainProfile } from "./components/main-profile/MainProfile";
export const Profilepage = () => {
  return (
    <div className="container flex flex-col md:flex-row lg:flex-row p-2">
      <FeedNavigation />
      <MainProfile />
      {/* <WhoToFollow /> */}
    </div>
  );
};
