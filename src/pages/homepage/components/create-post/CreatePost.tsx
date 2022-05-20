import { Emoji, Gallery, Send } from "../../../../assets";
export const CreatePost = () => {
  return (
    <div className="create-post hidden md:flex lg:flex mx-2 mt-2 py-4 px-2 rounded bg-primary-200">
      <div className="flex">
        <div className="avatar avatar-xs avatar-text rounded m-0 mr-2">MB</div>
      </div>
      <div className="w-full">
        <textarea
          placeholder="What's on your mind?"
          className="rounded  resize-y w-full p-2 bg-primary"
        />
        <footer className="flex items-center justify-center gap-12 child-hover:cursor-pointer child-hover:text-primary-700">
          <span>
            <Gallery />
          </span>
          <span>
            <Emoji />
          </span>
          <span>
            <Send />
          </span>
        </footer>
      </div>
    </div>
  );
};
