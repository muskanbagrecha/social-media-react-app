import { app } from "./firebase-config";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, deleteDoc, addDoc,query,orderBy } from 'firebase/firestore';
import { User } from "../store/auth-action/authSlice";
import { uploadPostImage, getImageUrl,uploadImageGetUrl } from "./firebase-storage";
import { serverTimestamp } from "firebase/firestore";
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
				likesList: [],
				bookmarkList: [],
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

const updateUserDB = async (updatedData : User) => {
    try {
        await setDoc(
            doc(userCollection, updatedData.uid),
            {
                displayName: updatedData.displayName || 'User',
                bio: updatedData.bio ?? '',
                portfolio: updatedData.portfolio ?? '',
            },
            { merge: true },
        );
    } catch (error) {
        console.log(error);
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

const followUser = async (currentUserId : string, userToFollowId : string ) => {
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
	} catch (error) {
		console.log(error);
	}
};

const unfollowUser = async (currentUserId : string, userToUnfollowId : string ) => {
    try {
		const currentUserFollowingCollection = getCollection(`users/${currentUserId}/following`);
        const followingUserFollowersCollection = getCollection(`users/${userToUnfollowId}/followers`);
        await deleteDoc(doc(currentUserFollowingCollection, userToUnfollowId));
        await deleteDoc(doc(followingUserFollowersCollection, currentUserId));
        await getDocs(currentUserFollowingCollection); 
    } catch (error) {
        console.log(error);
    }
};

const postCollection = collection(db, 'posts');

const createPost = async (userId: string, postData: any) => {
	try {
		const path = await uploadPostImage(userId, postData.image)
		const imageUrl = await getImageUrl(path);
		const documentId = await addDoc(postCollection, {
			uid: userId,
			image: imageUrl,
			caption: postData.caption,
			createdAt: postData.createdAt,
		});
		await setDoc(
			doc(postCollection, documentId.id),
			{
				postId: documentId.id,
			},
			{ merge: true },
		);
		return "SUCCESS";
	} catch (error) {
		console.log(error);
		return "FAILED";
	}
}

const getAllPosts = async () => {
	try {
		const docs = await getDocs(collection(db, 'posts'));
		const allPostsArray : any[] = []; //TODO: change to post type
		docs.forEach((doc) => {
			allPostsArray.push(Object(doc.data()));
		});
		return allPostsArray;
	} catch (error) {
		console.log(error);
		return [];
	}
}

const editPost = (postId : string, updatedCaption : string) => {
    try {
        const postCollection = collection(db, `posts`);
        setDoc(
            doc(postCollection, postId),
            {
                caption: updatedCaption,
            },
            { merge: true },
        );
    } catch (error) {
        console.log(error);
    }
};

const addCommentToPost = async (postId : string, uid : string, comment : string) => {
    try {
        const postCollection = collection(db, `posts/${postId}/comments`);
        const documentId = await addDoc(postCollection, {
            comment: comment,
            from: uid,
            timestamp: serverTimestamp(),
        });
        await setDoc(
            doc(postCollection, documentId.id),
            {
                commentId: documentId.id,
            },
            { merge: true },
        );
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async (postId : string) => {
    try {
        const postCollection = collection(db, `posts`);
        await deleteDoc(doc(postCollection, postId));
    } catch (error) {
        console.log(error);
    }
};

const likePost = async (postId : string, uid : string) => {
    try {
        const postLikesCollection = collection(db, `posts/${postId}/likes`);
        await setDoc(doc(postLikesCollection, uid), {
            uid: uid,
        });
        const userCollection = collection(db, `users/${uid}/likes`);
        await setDoc(doc(userCollection, postId), {
            postId: postId,
        });
		const posts = await getDocs(postLikesCollection);
		await setDoc(
			doc(postCollection, postId),
			{
				totalLikes: posts.size,
			},
			{ merge: true },
		);
    } catch (error) {
        console.log(error);
    }
};

const unlikePost = async (postId : string, uid : string) => {
	try {
		const postLikesCollection = collection(db, `posts/${postId}/likes`);
		await deleteDoc(doc(postLikesCollection, uid));
		const userCollection = collection(db, `users/${uid}/likes`);
		await deleteDoc(doc(userCollection, postId));
		const posts = await getDocs(postLikesCollection);
		await setDoc(
			doc(postCollection, postId),
			{
				totalLikes: posts.size,
			},
			{ merge: true },
		);
	} catch (error) {
		console.log(error);
	}
};


const getCommentsFromPost = async (postId:string) => {
	try {
		const postCollection = query(collection(db, `posts/${postId}/comments`), orderBy('timestamp', 'desc'));
		const allComments = await getDocs(postCollection);
		const allCommentsData : any[] = [];
		allComments.forEach((doc) => {
			console.log(doc.data())
			allCommentsData.push(doc.data());
		});
		// console.log(allCommentsData)
		return allCommentsData;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const addToBookmark = async (postId : string, uid : string) => {
	try {
		const userCollection = collection(db, `users/${uid}/bookmarks`);
		await setDoc(doc(userCollection, postId), {
			postId: postId,
		});
	} catch (error) {
		console.log(error);
	}
};

const removeFromBookmark = async (postId : string, uid : string) => {
	try {
		const userCollection = collection(db, `users/${uid}/bookmarks`);
		await deleteDoc(doc(userCollection, postId));
	} catch (error) {
		console.log(error);
	}
};


const editUserProfileImage = async (userId:string, imageFile:File|null) => {
	if (imageFile) {
		try {
			const url = await uploadImageGetUrl(imageFile, `users/${userId}`);
			console.log(url);
			await setDoc(doc(userCollection, userId), { photoURL: url }, { merge: true });
			return url;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	return;
};

const getCollectionsSize = async (path:string) => {
	try {
		const pathCollection = collection(db, path);
		const allDocs = await getDocs(pathCollection);
		return allDocs.size;
	} catch (error) {
		console.log(error);
		return 0;
	}
};
export {addUserToTheDB, getAllUsers, getUser, updateUserDB, followUser, unfollowUser, createPost, getAllPosts, editPost, likePost, deletePost, addCommentToPost, getAllDocumentsFromCollection, unlikePost, getCommentsFromPost, addToBookmark, removeFromBookmark,editUserProfileImage,getCollectionsSize};


