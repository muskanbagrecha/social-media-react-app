import { Emoji, Gallery, Send, Bookmark } from "../../../../assets";
import { useState } from "react";
import { createPost } from "../../../../firebase/firebase-firestore";
import { serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadPostImage } from "../../../../firebase/firebase-storage";
export const CreatePost = () => {
  const { authUser } = useSelector((store: any) => store.auth);
  const navigate = useNavigate();
  const createPostHandler = () => {
    if (!authUser) {
      navigate("/login");
    }
    if (!caption || !image) {
      alert("Please fill all the fields");
    }
    console.log(caption, image);
    const post = {
      caption,
      image,
      createdAt: serverTimestamp(),
    };
    createPost(authUser.uid, post);
  };

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>();
  return (
    <div className="create-post hidden md:flex lg:flex mx-2 mt-2 py-4 px-2 rounded-sm bg-primary-200">
      <div className="flex">
        <div className="avatar avatar-xs avatar-text rounded-sm m-0 mr-2">
          MB
        </div>
      </div>
      <div className="w-full">
        <div className="mb-2">
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="post"
              className="h-[200px] object-cover rounded"
            />
          )}
        </div>
        <textarea
          placeholder="What's on your mind?"
          className="rounded-sm  resize-y w-full p-2 bg-primary"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!authUser) {
              navigate("/login");
              return;
            }
            setCaption(e.target.value);
          }}
        />
        <section className="flex items-center justify-between my-2 gap-12 child-hover:cursor-pointer child-hover:text-primary-700">
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

          <span>
            <Emoji />
          </span>
          <span onClick={createPostHandler}>
            <Send />
          </span>
          <span>
            <Bookmark />
          </span>
        </section>
      </div>
    </div>
  );
};
