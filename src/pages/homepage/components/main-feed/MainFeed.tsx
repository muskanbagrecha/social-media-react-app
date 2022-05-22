import { useEffect, useState } from "react";
import { CreatePost } from "../";
import { Post } from "../post/Post";
import { useSelector } from "react-redux";
import { PostInterface } from "../../../../store/posts-action/allPosts";
import { Plus } from "../../../../assets";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/modal-action/modalSlice";
import "./MainFeed.css";
import { useNavigate } from "react-router-dom";

export const MainFeed: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any>([]);
  const { authUser } = useSelector((store: any) => store.auth);
  const { allPosts } = useSelector((store: any) => store.allPosts);
  const { followingList } = useSelector((store: any) => store.auth);
  const homepagePost = allPosts?.filter(
    (post: PostInterface) =>
      followingList?.findIndex(
        (user: { id: string }) => user.id === post.uid
      ) !== -1 || authUser?.uid === post.uid
  );
  const dispatch = useDispatch();

  const createPostHandler = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    dispatch(openModal("CreatePostsCard"));
  };

  useEffect(() => {
    setPosts(homepagePost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followingList, allPosts]);

  return (
    <main className="w-full md:w-3/5 lg:w-3/5 flex flex-col main-feed rounded relative">
      <CreatePost />
      <div className="all-posts flex flex-col">
        {posts?.map((post: PostInterface) => (
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
      <button
        className="btn-floating hidden sm:flex md:flex lg:flex items-center fixed bottom-8 right-8 md:right-12"
        onClick={createPostHandler}
      >
        <Plus />
      </button>
    </main>
  );
};
