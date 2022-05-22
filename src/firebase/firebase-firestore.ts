import { app } from "./firebase-config";
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
// import { User } from "firebase/auth";
import { User } from "../store/auth-action/authSlice";
const db = getFirestore(app);
const userCollection = collection(db, 'users');
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
		if (docSnap.exists()) {
			return Object(docSnap.data());
		} else {
			console.log('No such document!');
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};



export {addUserToTheDB, getUser};