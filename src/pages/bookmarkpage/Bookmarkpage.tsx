import { FeedNavigation, WhoToFollow } from "../homepage/components";
import { useSelector } from "react-redux";
import { Post } from "../homepage/components/post/Post";
import { PostInterface } from "../../store/posts-action/allPosts";
export const Bookmarkpage = () => {
  const { bookmarkList } = useSelector((store: any) => store.auth);
  const { allPosts } = useSelector((store: any) => store.allPosts);

  const bookmarkedPosts = allPosts.filter(
    (post: PostInterface) =>
      bookmarkList.findIndex(
        (bookmarkedPost: { postId: string }) =>
          bookmarkedPost.postId === post.postId
      ) !== -1
  );

  return (
    <div className="container flex flex-col md:flex-row lg:flex-row p-2">
      <FeedNavigation />
      <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col gap-4 rounded  child:mx-auto mt-2">
        <h1 className="large-title text-4xl">Bookmarks</h1>
        <div className="all-posts text-center">
          {bookmarkedPosts.length === 0 ? (
            <h1>You have no bookmarks.</h1>
          ) : (
            bookmarkedPosts?.map((post: PostInterface) => {
              return (
                <Post
                  caption={post.caption}
                  image={post.image}
                  uid={post.uid}
                  postId={post.postId}
                  createdAt={post.createdAt}
                  totalLikes={post.totalLikes}
                />
              );
            })
          )}
        </div>
      </div>
      <WhoToFollow />
    </div>
  );
};
