import { SolidBookmark, RegularBookmark } from "../../../../assets";
import { useSelector } from "react-redux";
import {
  addToBookmark,
  removeFromBookmark,
} from "../../../../firebase/firebase-firestore";
import { useNavigate } from "react-router-dom";
export const BookmarkButton = ({ postId }: { postId: string }) => {
  const { authUser, bookmarkList } = useSelector((store: any) => store.auth);
  const isBookmarked =
    bookmarkList?.findIndex((post: any) => post.postId === postId) === -1
      ? false
      : true;
  const navigate = useNavigate();
  const bookmarkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    !authUser && navigate("/login");
    isBookmarked
      ? removeFromBookmark(postId, authUser.uid)
      : addToBookmark(postId, authUser.uid);
  };

  return (
    <span className="hover:text-primary-700" onClick={bookmarkClickHandler}>
      {isBookmarked ? <SolidBookmark /> : <RegularBookmark style={{}} />}
    </span>
  );
};
