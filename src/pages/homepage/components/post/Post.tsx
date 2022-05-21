import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, editPost } from "../../../../firebase/firebase-firestore";
import PropTypes, { InferProps } from "prop-types";
import { Pencil, Trash, Check, Comment } from "../../../../assets";
import { LikeButton, CommentSection, BookmarkButton } from "../";
import "./Post.css";
export function Post({
  caption,
  image,
  uid,
  postId,
  createdAt,
  totalLikes,
}: InferProps<typeof Post.propTypes>) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [editCaption, setEditCaption] = useState<string>(caption);
  const { allUsers } = useSelector((store: any) => store.allUsers);
  const { authUser } = useSelector((store: any) => store.auth);
  const userData = allUsers.find((user: any) => user.uid === uid);
  const navigate = useNavigate();
  const submitHandler = (e: { preventDefault: () => void }) => {
    editCaption !== caption && editPost(postId, editCaption);
    setEnableEdit(false);
  };

  return (
    <article className="post rounded-sm bg-primary-200 m-2">
      <header
        className="border-b flex items-center border-gray-200 mb-2 cursor-pointer"
        onClick={() => navigate(`/profile/${uid}`)}
      >
        <div className="avatar avatar-xs cursor-pointer h-[3rem] w-[3rem]">
          <img
            src={userData?.photoURL ?? ""}
            alt={userData?.displayName ?? "profile"}
            className="img-rounded img-responsive"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-base">{userData?.displayName}</p>
          <p className="text-xs">
            {createdAt?.toDate().toLocaleString("en-IN", {
              timeStyle: "short",
              dateStyle: "medium",
            })}
          </p>
        </div>
        <p className="ml-auto cursor-pointer mr-2">
          <BookmarkButton postId={postId} />
        </p>
      </header>
      <div className="img-wrapper">
        <img src={image} alt={caption} />
      </div>
      <div className="p-2">
        <div className="pb-2 flex items-center">
          {enableEdit ? (
            <input
              type="text"
              value={editCaption}
              className="w-full p-2 bg-primary-200 focus:outline-0"
              onChange={(e) => setEditCaption(e.target.value)}
            />
          ) : (
            <p className="text-sm mt-2 ml-4">{caption}</p>
          )}
          <span
            className="hover:text-primary-700 ml-auto cursor-pointer mx-2"
            onClick={(e) => {
              if (!enableEdit) {
                setEnableEdit(true);
              } else {
                setEnableEdit(false);
                submitHandler(e);
              }
            }}
          >
            {authUser?.uid === uid && (enableEdit ? <Check /> : <Pencil />)}
          </span>
          {authUser?.uid === uid && (
            <span
              onClick={() => {
                deletePost(postId);
              }}
              className="hover:text-primary-700 cursor-pointer"
            >
              <Trash />
            </span>
          )}
        </div>
        <hr />
        <div className="flex my-2 justify-evenly child:min-w-[8rem] child:py-2 child:px-5 child:gap-2 child:text-base">
          <LikeButton postLike={totalLikes} postId={postId} />
          <button
            type="button"
            className="font-medium text-gray-900 rounded  hover:bg-primary-100 hover:text-primary-500 flex items-center justify-center"
            onClick={() => {
              setShowComments((prev) => !prev);
            }}
          >
            <Comment />
            Comments
          </button>
        </div>
        {<CommentSection postId={postId} showComments={showComments} />}
      </div>
    </article>
  );
}

Post.propTypes = {
  caption: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  createdAt: PropTypes.any.isRequired,
  postId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
};
