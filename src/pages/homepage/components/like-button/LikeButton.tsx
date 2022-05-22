import { RegularHeart, SolidHeart } from "../../../../assets";
import { useNavigate } from "react-router-dom";
import { likePost, unlikePost } from "../../../../firebase/firebase-firestore";
import { useSelector } from "react-redux";
import { PostInterface } from "../../../../store/posts-action/allPosts";

export const LikeButton = ({
  postId,
  postLike,
}: {
  postId: string;
  postLike: number;
}) => {
  const { authUser, likesList } = useSelector((store: any) => store.auth);
  const isLiked =
    likesList?.findIndex((post: PostInterface) => post.postId === postId) === -1
      ? false
      : true;

  const navigate = useNavigate();

  const likeHandler = () => {
    !authUser && navigate("/login");
    isLiked ? unlikePost(postId, authUser.uid) : likePost(postId, authUser.uid);
  };

  return (
    <button
      type="button"
      className="font-medium text-gray-900 rounded  hover:bg-primary-100 hover:text-primary-500 flex items-center justify-center"
      onClick={likeHandler}
    >
      {isLiked ? (
        <SolidHeart style={{ fill: "red", color: "red" }} />
      ) : (
        <RegularHeart />
      )}
      {postLike > 0 && postLike} Likes
    </button>
  );
};
