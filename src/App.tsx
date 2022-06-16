import { Navigation, Footer } from "./components";
import { AppRouter } from "./router/AppRouter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startListeners,
  startUserDetailListener,
} from "./firebase/firebase-listeners";
import { Modal } from "./components/modal/Modal";
import spinner from "./assets/spinner.svg";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { authUser, isLoading } = useSelector((store: any) => store.auth);

  useEffect(() => {
    startListeners(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (authUser) {
      startUserDetailListener(dispatch, authUser.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  return (
    <>
      {isLoading && (
        <>
          <div className="backdrop"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <img src={spinner} className="spinner" alt="spinner" />
          </div>
        </>
      )}
      <Modal />
      <Navigation />
      <AppRouter />
      <Footer />
    </>
  );
};
