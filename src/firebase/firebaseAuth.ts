import {app} from "./firebase-config";
import {
    getAuth,
    signOut,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { setIsLoading } from "../store/auth-action/authSlice";
import { getDoc, doc } from "firebase/firestore";
import {setAuthUser} from "../store/auth-action/authSlice";
import { addUserToTheDB, getAllDocumentsFromCollection } from "./firebase-firestore";
import { db } from "./firebase-firestore"

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const googleAuthHandler = async (dispatch : Function) => {
    try {
        dispatch(setIsLoading(true));
        await signInWithPopup(auth, provider);
        const docSnap = await getDoc(doc(db, `users`, auth?.currentUser?.uid ?? ""));
        if (docSnap.exists()) {
        } else {
            await addUserToTheDB(auth?.currentUser?.uid,
                 {		
                    displayName: auth.currentUser?.displayName,
                    uid: auth.currentUser?.uid,
                    photoURL: auth.currentUser?.photoURL,
                    email: auth.currentUser?.email,
                    bio: '',
                    portfolio: '',
                    backgroundImageURL: '',
                });
        }
    } catch (error) {
        console.log(error);
    }
    finally{
        dispatch(setIsLoading(false));
    }
};

export const loginHandler = async(email : string, password : string, dispatch: Function) => {
    try {
        dispatch(setIsLoading(true));
		await signInWithEmailAndPassword(auth, email, password);
        const followersList = await getAllDocumentsFromCollection(`users/${auth?.currentUser?.uid}/followers`);
		const followingList = await getAllDocumentsFromCollection(`users/${auth?.currentUser?.uid}/following`);

        dispatch(setAuthUser({authUser: {uid: auth?.currentUser?.uid, email: "", displayName: "", photoURL: "", bio: "", portfolio: "", backgroundImageURL: ""}, followersList, followingList, postsList : null, likesList: null, bookmarkList: null, isLoading: false, error: ""}));
        
	} catch (error : any) {
		console.log(error.message);
	}
    finally{
        dispatch(setIsLoading(false));
    }
}

export const signupHandler = async(name: string, email : string, password : string, dispatch: Function) => {
    try {
        dispatch(setIsLoading(true));
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
			displayName: name,
		});
        await addUserToTheDB(auth?.currentUser?.uid, {	
            displayName: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/fir-tutorial-b0a62.appspot.com/o/defaults%2Fuser-avatar.png?alt=media&token=176e741b-7a2f-40d1-bcd9-90135f5dbf67',
            email: auth.currentUser?.email,
            bio: '',
            portfolio: '',
            backgroundImageURL: '',});
    } catch (error) {
        console.log(error);
    }
    finally{
        dispatch(setIsLoading(false));
    }
}

export const logoutHandler = () => {
	try {
		signOut(auth);
	} catch (error) {
		console.log(error);
	}
};