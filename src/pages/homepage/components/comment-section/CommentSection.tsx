import {
  getCommentsFromPost,
  addCommentToPost,
} from "../../../../firebase/firebase-firestore";
import "./CommentSection.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User } from "../../../../store/auth-action/authSlice";
import { Send } from "../../../../assets";
import { useNavigate } from "react-router-dom";
export const CommentSection = ({
  postId,
  showComments,
}: {
  postId: string;
  showComments: boolean;
}) => {
  const [comments, setComments] = useState<any[]>([]);

  const getComments = async () => {
    const tempComments = await getCommentsFromPost(postId);
    setComments(tempComments);
  };
  const [input, setInput] = useState("");

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  const { authUser } = useSelector((store: any) => store.auth);

  const addCommentHandler = () => {
    !authUser && navigate("/login");
    input && addCommentToPost(postId, authUser.uid, input);
    input && getComments();
    setInput("");
  };

  return (
    <div
      className={`comment-holder ${
        showComments ? "" : "comment-holder-closed"
      }`}
    >
      <div className="flex justify-between gap-2 items-center">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 border-none"
          value={input}
        />
        <span
          className="mr-2 cursor-pointer hover:text-primary-700"
          onClick={addCommentHandler}
        >
          <Send />
        </span>
      </div>
      {comments.map((comment: any) => (
        <SingleComment
          key={comment.timestamp}
          timestamp={comment.timestamp}
          from={comment.from}
          comment={comment.comment}
        />
      ))}
    </div>
  );
};

const SingleComment = ({
  timestamp,
  from,
  comment,
}: {
  timestamp: any;
  from: string;
  comment: string;
}) => {
  const { allUsers } = useSelector((store: any) => store.allUsers);
  const user = allUsers.find((user: User) => user.uid === from);
  const { photoURL, displayName } = user;
  return (
    <div className="flex border-b-2 my-2 items-center">
      <div className="avatar avatar-xs  cursor-pointer hidden md:flex lg:flex">
        <img
          src={photoURL ?? ""}
          alt={displayName}
          className="img-rounded img-responsive"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm">{displayName}</p>
        <p className="text-xs text-gray-500">
          {timestamp?.toDate().toLocaleString("en-IN", {
            timeStyle: "short",
            dateStyle: "medium",
          })}
        </p>
        <p className="text-base">{comment}</p>
      </div>
    </div>
  );
};
