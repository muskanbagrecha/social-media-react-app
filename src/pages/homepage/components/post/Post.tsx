import { useState } from "react";
import { Heart as Like, Comment } from "../../../../assets";
import "./Post.css";
export const Post = () => {
  const [showComments, setShowComments] = useState<boolean>(false);

  const commentData = new Array(12).fill({
    avatar: "MB",
    name: "Muskan Bagrecha",
    comment: "Nice work musk!",
    date: "2020-01-01",
  });

  return (
    <article className="post rounded-md bg-primary-200 m-2 py-2">
      <header>
        <div>
          <div className="avatar avatar-xs avatar-text rounded">MB</div>
        </div>
        <div className="flex flex-col">
          <p className="text-base">Muskan Bagrecha</p>
          <p className="text-xs">12 hours ago</p>
        </div>
      </header>
      <img
        src="https://images.unsplash.com/photo-1556227691-add1cf868ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1441&q=80"
        alt=""
      />
      <footer className="p-2">
        <div className="flex justify-between"></div>
        <div className="flex my-2 justify-evenly child:min-w-[8rem] child:py-2 child:px-5 child:gap-2 child:text-base">
          <button
            type="button"
            className="font-medium text-gray-900 rounded-lg hover:bg-primary-100 hover:text-primary-500 flex items-center justify-center"
          >
            <Like />6 Likes
          </button>
          <button
            type="button"
            className="font-medium text-gray-900 rounded-lg hover:bg-primary-100 hover:text-primary-500 flex items-center justify-center"
            onClick={() => setShowComments(!showComments)}
          >
            <Comment />5 Comments
          </button>
        </div>
        <hr />
        <div className="max-h-[14rem] overflow-y-scroll comment-section">
          {showComments &&
            commentData.map((comment: any) => (
              <div className="flex border-b-2 my-2">
                <div className="avatar avatar-text avatar-xs">
                  {comment.avatar}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm">{comment.name}</p>
                  <p className="text-xs text-gray-500">{comment.date}</p>
                  <p className="text-base">{comment.comment}</p>
                </div>
              </div>
            ))}
        </div>

        <p className="text-sm text-center mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, porro.
        </p>
      </footer>
    </article>
  );
};
