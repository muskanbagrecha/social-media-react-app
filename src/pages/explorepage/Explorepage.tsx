import { useState } from "react";
import { FeedNavigation, WhoToFollow, Post } from "../homepage/components";
import { useSelector } from "react-redux";
import { PostInterface } from "../../store/posts-action/allPosts";
export const Explorepage = () => {
  return (
    <div className="container max-w-[1100px] flex flex-col md:flex-row lg:flex-row p-2">
      <FeedNavigation />
      <ExploreFeed />
      <WhoToFollow />
    </div>
  );
};

const ExploreFeed: React.FC = () => {
  const { allPosts } = useSelector((store: any) => store.allPosts);
  const [input, setInput] = useState("latest");

  const filterByOldest = (posts: PostInterface[]) => {
    const sortedByOldestPosts = [...posts].reverse();
    return sortedByOldestPosts;
  };

  const filterByNewest = (posts: PostInterface[]) => {
    return posts;
  };

  const filterByMostLiked = (posts: PostInterface[]) => {
    const sortedByMostLiked = [...posts].sort(
      (a: PostInterface, b: PostInterface) => b.totalLikes - a.totalLikes
    );
    return sortedByMostLiked;
  };

  const filterChangeHandler = () => {
    let filteredData: PostInterface[] = [];
    if (input === "oldest") {
      filteredData = filterByOldest(allPosts);
    } else if (input === "latest") {
      filteredData = filterByNewest(allPosts);
    } else if (input === "trending") {
      filteredData = filterByMostLiked(allPosts);
    }
    return filteredData;
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInput(event.target.value);
  };

  return (
    <main className="w-full md:w-3/5 lg:w-3/5 flex flex-col main-feed rounded">
      <div className="flex justify-center">
        <select
          className="form-select form-select-sm px-2 py-1 text-sm border border-solid border-primary-500 rounded m-0 focus:border-primary-500 focus:outline-none w-32"
          onChange={onChangeHandler}
          value={input}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="trending">Trending</option>
        </select>
      </div>
      <div className="all-posts flex flex-col">
        {filterChangeHandler()?.map((post: PostInterface) => (
          <Post
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            createdAt={post.createdAt}
            key={post.postId}
            postId={post.postId}
            totalLikes={post.totalLikes}
          />
        ))}
      </div>
    </main>
  );
};
