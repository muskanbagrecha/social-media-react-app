import { FeedNavigation, WhoToFollow, MainFeed } from "./components";
export const Homepage = () => {
  return (
    <div className="container flex flex-col md:flex-row lg:flex-row p-2">
      <FeedNavigation />
      <MainFeed />
      <WhoToFollow />
    </div>
  );
};
