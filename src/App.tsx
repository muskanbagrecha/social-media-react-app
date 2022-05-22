import { Navigation, Footer } from "./components";
import { AppRouter } from "./router/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseAuth";
import { setAuthUser } from "./store/auth-action/authSlice";
import { getUser } from "./firebase/firebase-firestore";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setTheme());
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // dispatch(
        //   setAuthUser({
        //     uid: user.uid,
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        //     bio: "",
        //     portfolio: "",
        //     backgroundImageURL: "",
        //     followers: 0,
        //     following: 0,
        //     posts: 0,
        //   })
        // );
        const authenticatedUser = await getUser(user.uid);
        dispatch(setAuthUser(authenticatedUser));
        if (!authenticatedUser)
          setTimeout(async () => {
            const authenticatedUser = await getUser(user.uid);
            dispatch(setAuthUser(authenticatedUser));
          }, 1000);
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
