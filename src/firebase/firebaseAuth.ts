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
import {setAuthUser} from "../store/auth-action/authSlice";
import { addUserToTheDB, getUser } from "./firebase-firestore";

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const googleAuthHandler = async (dispatch : Function) => {
    try {
        // dispatch(setIsLoading(true));
        await signInWithPopup(auth, provider);
        const userExists = await getUser(auth?.currentUser?.uid);
        !userExists && await addUserToTheDB(auth?.currentUser?.uid, {		
            displayName: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
            photoURL: auth.currentUser?.photoURL,
            email: auth.currentUser?.email,
            followers: 0,
            following: 0,
            posts: 0,
            bio: '',
            portfolio: '',
            backgroundImageURL: '',});
        // dispatch(setIsLoading(false));
    } catch (error) {
        console.log(error);
        // errorHandler(true, error.message);
        // dispatch(setIsLoading(false));
    }
};

export const loginHandler = async(email : string, password : string, dispatch: Function) => {
    try {
		// dispatch(setIsLoading(true));
		await signInWithEmailAndPassword(auth, email, password);
        console.log(auth.currentUser);
        
        dispatch(setAuthUser({uid: auth?.currentUser?.uid, email: "", displayName: "", photoURL: "", bio: "", portfolio: "", backgroundImageURL: "", followers: 0, following: 0, posts: 0}));
        
		// dispatch(setIsLoading(false));
	} catch (error : any) {
		console.log(error.message);
		// errorHandler(true, error.message);
		// dispatch(setIsLoading(false));
	}
}

export const signupHandler = async(name: string, email : string, password : string, dispatch: Function) => {
    try {
        // dispatch(setIsLoading(true));
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
			displayName: name,
			// photoURL: defaultImage,
		});
        await addUserToTheDB(auth?.currentUser?.uid, {		
            displayName: auth.currentUser?.displayName,
            uid: auth.currentUser?.uid,
            photoURL: auth.currentUser?.photoURL,
            email: auth.currentUser?.email,
            followers: 0,
            following: 0,
            posts: 0,
            bio: '',
            portfolio: '',
            backgroundImageURL: '',});
        // dispatch(setIsLoading(false));
    } catch (error) {
        console.log(error);
        // errorHandler(true, error.message);
        // dispatch(setIsLoading(false));
    }
}

export const logoutHandler = () => {
	try {
		signOut(auth);
	} catch (error) {
		console.log(error);
	}
};