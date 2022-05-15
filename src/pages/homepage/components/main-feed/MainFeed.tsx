import { Moments } from "../moments/Moments";
import { CreatePost } from "../create-post/CreatePost";
import { Post } from "../post/Post";
import "./MainFeed.css";

export const MainFeed: React.FC = () => {
  return (
    <main className="w-full md:w-3/5 lg:w-3/5 flex flex-col main-feed rounded ">
      <Moments />
      <CreatePost />
      <div className="all-posts flex flex-col">
        <Post />
        <Post />
      </div>
    </main>
  );
};
