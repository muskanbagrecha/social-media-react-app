import { app } from "./firebase-config";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { User, setFollowingList } from "../store/auth-action/authSlice";
export const db = getFirestore(app);
const userCollection = collection(db, 'users');

const getCollection = (collectionLocation : string) => {
	return collection(db, collectionLocation);
};

const getAllDocumentsFromCollection = async (collectionLocation : string) => { 
	const docs = await getDocs(collection(db, collectionLocation));
	let temp : any= []
	docs.forEach((doc) => {
		temp.push(Object(doc.data()));
	});
	return temp;
}

const addUserToTheDB = async (yourDocumentId : string | undefined, data : User) => {
	try {
		await setDoc(doc(userCollection, yourDocumentId), {
			...data,
		},
        { merge: true }
        );
	} catch (error) {
		console.log(error);
	}
};

const getUser = async (userId : string | undefined) => {
	try {
		const docRef = doc(userCollection, userId);
		const docSnap = await getDoc(docRef);
		const followersList = await getAllDocumentsFromCollection(`users/${userId}/followers`);
		const followingList = await getAllDocumentsFromCollection(`users/${userId}/following`);

		if (docSnap.exists()) {
			let userObj = {
				authUser: Object(docSnap.data()),
				followersList,
				followingList,
				postsList: [],
				isLoading: false,
				error: "",
			}
			return userObj
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};


const getAllUsers = async () => {
	try {
		const docs = await getDocs(collection(db, 'users'));
		const allUsersArray : User[] = [];
		docs.forEach((doc) => {
			allUsersArray.push(Object(doc.data()));
		});
		return allUsersArray;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const followUser = async (currentUserId : string, userToFollowId : string, dispatch : Function) => {
	try {
		const currentUserFollowingCollection = getCollection(`users/${currentUserId}/following`);
		await setDoc(doc(currentUserFollowingCollection, userToFollowId),
        {
			id: userToFollowId,
		});        
		const followingUserFollowersCollection = getCollection(`users/${userToFollowId}/followers`);
		await setDoc(doc(followingUserFollowersCollection, currentUserId), {
			id: currentUserId,
		});
        const currentUserFollowingList = await getDocs(currentUserFollowingCollection);
        const temp : User[] = [];
        currentUserFollowingList.forEach((doc) => {
            temp.push(Object(doc.data()));
        });
        dispatch(setFollowingList(temp));
	} catch (error) {
		console.log(error);
	}
};

const unfollowUser = async (currentUserId : string, userToUnfollowId : string, dispatch : Function) => {
    try {
		const currentUserFollowingCollection = getCollection(`users/${currentUserId}/following`);
        const followingUserFollowersCollection = getCollection(`users/${userToUnfollowId}/followers`);
        await deleteDoc(doc(currentUserFollowingCollection, userToUnfollowId));
        await deleteDoc(doc(followingUserFollowersCollection, currentUserId));
        const currentUserFollowingList = await getDocs(currentUserFollowingCollection);
        const temp : User[] = [];
        currentUserFollowingList.forEach((doc) => {
            temp.push(Object(doc.data()));
        });
        dispatch(setFollowingList(temp));
    } catch (error) {
        console.log(error);
    }
};

export {addUserToTheDB, getAllUsers, getUser, followUser, unfollowUser, getAllDocumentsFromCollection};