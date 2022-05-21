import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostInterface } from "../../../../store/posts-action/allPosts";
import { Post } from "../../../homepage/components/post/Post";
export const AllPosts = (props: { userId: string }) => {
  const { allPosts } = useSelector((store: any) => store.allPosts);
  const [currentUserPosts, setCurrentUserPosts] = useState<PostInterface[]>([]);
  const userId = props.userId;
  useEffect(() => {
    if (allPosts) {
      const posts: PostInterface[] = allPosts.filter(
        (post: PostInterface) => post.uid === userId
      );
      setCurrentUserPosts(posts);
    }
  }, [allPosts, userId]);

  return (
    <>
      {currentUserPosts.length > 0 ? (
        currentUserPosts.map((post: PostInterface) => (
          <Post
            caption={post.caption}
            image={post.image}
            uid={post.uid}
            createdAt={post.createdAt}
            key={post.postId}
            postId={post.postId}
            totalLikes={post.totalLikes}
          />
        ))
      ) : (
        <h1>No posts to show!</h1>
      )}
    </>
  );
};
