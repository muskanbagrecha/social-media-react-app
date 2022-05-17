import { Navigation, Footer } from "./components";
import { AppRouter } from "./router/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseAuth";
import { setAuthUser } from "./store/auth-action/authSlice";
import { setAllUsers } from "./store/users-action/allUsersSlice";
import { getUser, getAllUsers } from "./firebase/firebase-firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// async function getLink() {
//   const storage = getStorage();
//   const storageRef = ref(storage, "defaults/user-avatar.png");
//   const url = await getDownloadURL(storageRef);
//   console.log(url);
// }

export const App: React.FC = () => {
  const dispatch = useDispatch();
  // getLink();
  const getAllUserHandler = async () => {
    const allUsers = await getAllUsers();
    dispatch(setAllUsers(allUsers));
  };

  useEffect(() => {
    // dispatch(setTheme());
    getAllUserHandler();
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        const authenticatedUser = await getUser(user.uid);
        dispatch(setAuthUser(authenticatedUser));
        if (!authenticatedUser) {
          setTimeout(async () => {
            const authenticatedUser = await getUser(user.uid);
            dispatch(setAuthUser(authenticatedUser));
          }, 1000);
        }
      } else {
        dispatch(setAuthUser(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigation />
      <AppRouter />
      <Footer />
    </>
  );
};
