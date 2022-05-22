import { Navigation, Footer } from "./components";
import { AppRouter } from "./router/AppRouter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startListeners, startUserDetailListener } from "./firebase/firebase-listeners";
import { Modal } from "./components/modal/Modal";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store: any) => store.auth);
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
      <Modal />
      <Navigation />
      <AppRouter />
      <Footer />
    </>
  );
};
