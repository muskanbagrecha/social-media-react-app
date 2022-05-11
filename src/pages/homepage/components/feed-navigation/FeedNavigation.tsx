import { Link } from "react-router-dom";
import {
  User,
  Home,
  Explore,
  Bookmark,
  Notification,
} from "../../../../assets/";
import "./FeedNavigation.css";

export const FeedNavigation: React.FC = () => {
  return (
    <nav className="dark:bg-gray-800 relative rounded-lg mx-2 md:order-last order-last md:order-first lg:order-first md:w-1/5 lg:w-1/5 feed-navigation">
      <div className="create-icon avatar avatar-xs avatar-text">+</div>
      <div className="overflow-y-auto p-3 md:py-4 lg-py-4 bg-gray-50 dark:bg-gray-800 rounded-lg sticky top-20">
        <ul className="my-2 md:space-y-2 lg:space-y-2 flex md:block p-0">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="nav-label flex-1 ml-3 whitespace-nowrap">
                Feed
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Explore className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="nav-label flex-1 ml-3 whitespace-nowrap ">
                Explore
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Notification className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 nav-label whitespace-nowrap">
                Notifications
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bookmark className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 nav-label whitespace-nowrap">
                Bookmark
              </span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium rounded-full badge">
                3
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap nav-label">
                Profile
              </span>
            </Link>
          </li>
          {/* <button className="btn bg-gray-100 transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-gray-700 mx-auto px-1">
            Add Post
          </button> */}
          {/* <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
