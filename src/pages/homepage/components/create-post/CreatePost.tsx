import { Gallery, Send, User } from "../../../../assets";
import { useState } from "react";
import { createPost } from "../../../../firebase/firebase-firestore";
import { serverTimestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { closeModal } from "../../../../store/modal-action/modalSlice";

export const CreatePost = () => {
  const { authUser } = useSelector((store: any) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const createPostHandler = async () => {
    if (!authUser) {
      navigate("/login");
    }
    if (!caption || !image) {
      alert("Please fill all the fields");
      return;
    }
    const post = {
      caption,
      image,
      createdAt: serverTimestamp(),
    };
    setIsLoading(true);
    const postCreationResult = await createPost(authUser.uid, post);
    if (postCreationResult === "SUCCESS") {
      setIsLoading(false);
      setCaption("");
      setImage(null);
      dispatch(closeModal());
    }
  };

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="create-post hidden md:flex lg:flex mx-2 py-4 px-2 rounded-sm bg-primary-200"
    >
      <div className="flex cursor-pointer">
        {authUser ? (
          <div
            className="avatar avatar-xs m-0 mr-2"
            onClick={() => navigate(`/profile/${authUser?.uid}`)}
          >
            <img
              src={
                authUser?.photoURL ??
                "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
              }
              className="img-responsive img-rounded"
              alt={authUser?.displayName ?? ""}
            />
          </div>
        ) : (
          <div
            className="avatar avatar-xs m-0 mr-2"
            onClick={() => navigate(`/login`)}
          >
            <img
              src="https://voxpopulii.in/system/static/dashboard/img/default_user.png"
              className="img-responsive img-rounded"
              alt="user"
            />
          </div>
        )}
      </div>
      <div className="w-full">
        <div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="post"
              className="h-[200px] object-cover rounded mb-2"
            />
          )}
        </div>
        <textarea
          placeholder="What's on your mind?"
          className="rounded-sm resize-y w-full p-2 bg-primary outline-none"
          value={caption}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!authUser) {
              navigate("/login");
              return;
            }
            setCaption(e.target.value);
          }}
        />
        <section className="flex items-center justify-center my-2 gap-12 child-hover:cursor-pointer child-hover:text-primary-700">
          <span>
            <label htmlFor="file" className="cursor-pointer">
              <input
                type="file"
                id="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!authUser) {
                    navigate("/login");
                    return;
                  }
                  let files = (e.target as HTMLInputElement).files;
                  setImage(files ? files[0] : null);
                }}
                className="hidden"
              />
              <Gallery />
            </label>
          </span>
          <span
            onClick={createPostHandler}
            className={isLoading ? "pointer-events-none" : ""}
          >
            <Send />
          </span>
        </section>
      </div>
    </div>
  );
};
