import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseAuth";
import { setAuthUser, setBookmarkList, setLikesList, setFollowingList, setFollowersList, resetAuthState } from "../store/auth-action/authSlice";
import { getUser, db } from './firebase-firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { setAllUsers } from "../store/users-action/allUsersSlice";
import { setAllPosts } from "../store/posts-action/allPosts";

const startListeners = (dispatch : Function) => {
    authChangeListener(dispatch);
    usersListener(dispatch);
    postsListener(dispatch);
};

const authChangeListener = (dispatch : Function) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const authenticatedUser = await getUser(user.uid);
            dispatch(setAuthUser(authenticatedUser));
            if (!authenticatedUser)
                setTimeout(async () => {
                    const authenticatedUser = await getUser(user.uid);
                    dispatch(setAuthUser(authenticatedUser));
                }, 1000);
        } else {
            dispatch(resetAuthState());
        }
    });
};

const usersListener = (dispatch : Function) => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
        dispatch(setAllUsers(Object(snapshot.docs.map((doc) => doc.data()))));
    });
};

const postsListener = (dispatch : Function) => {
    onSnapshot(query(collection(db, 'posts'), orderBy('createdAt', 'desc')), (snapshot) => {
        dispatch(setAllPosts(Object(snapshot.docs.map((doc) => doc.data()))));
    });
};

export const startUserDetailListener = (dispatch : Function, userId : string) => {
    try {
        onSnapshot(collection(db, `users/${userId}/following`), (snapshot) => {
            dispatch(setFollowingList(snapshot.docs.map((doc) => Object(doc.data()))));
        });

        onSnapshot(collection(db, `users/${userId}/followers`), (snapshot) => {
            dispatch(setFollowersList(snapshot.docs.map((doc) => Object(doc.data()))));
        });

        onSnapshot(collection(db, `users/${userId}/likes`), (snapshot) => {
            dispatch(setLikesList(snapshot.docs.map((doc) => Object(doc.data()))));
        });

        onSnapshot(collection(db, `users/${userId}/bookmarks`), (snapshot) => {
            dispatch(setBookmarkList(snapshot.docs.map((doc) => Object(doc.data()))));
        });
    } catch (err) {
        console.log(err);
    }
};

export { startListeners };

