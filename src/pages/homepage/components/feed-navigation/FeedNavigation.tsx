import { Link, useNavigate } from "react-router-dom";
import { User, Home, Explore, SolidBookmark, Plus } from "../../../../assets/";
import { useSelector, useDispatch } from "react-redux";
import "./FeedNavigation.css";
import { openModal } from "../../../../store/modal-action/modalSlice";

export const FeedNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const createPostHandler = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }
    dispatch(openModal("CreatePostsCard"));
  };

  return (
    <nav className="dark:bg-gray-800 relative rounded-md mx-2 md:order-last order-last md:order-first lg:order-first md:w-1/5 lg:w-1/5 feed-navigation">
      <div
        className="create-icon avatar avatar-text avatar-xs"
        onClick={createPostHandler}
      >
        <Plus />
      </div>
      <div className="overflow-y-auto p-3 md:py-4 lg-py-4 bg-gray-50 dark:bg-gray-800 rounded sticky top-20">
        <ul className="my-2 md:space-y-2 lg:space-y-2 flex md:block p-0">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="nav-label flex-1 ml-3 whitespace-nowrap">
                Feed
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Explore className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="nav-label flex-1 ml-3 whitespace-nowrap ">
                Explore
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/bookmark"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SolidBookmark className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 nav-label whitespace-nowrap">
                Bookmark
              </span>
              {/* {bookmarkList?.length > 0 && (
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium rounded-full badge">
                  {bookmarkList.length}
                </span>
              )} */}
              {/* above code will be fixed */}
            </Link>
          </li>
          <li onClick={() => navigate(`/profile/${authUser?.uid}`)}>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap nav-label">
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
