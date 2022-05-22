import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const uploadPostImage = async (userId: string, file: File | null | undefined) => {
    const tempId = new Date().getTime();
    const path = `posts/${userId}/${tempId}`;
    const storageRef = ref(storage, path);
    file && await uploadBytes(storageRef, file);
    return path;
}

const getImageUrl = async (path: string) => {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
}


const uploadImageGetUrl = async (file:File, path:string) => {
	try {
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, file);
		const url = await getDownloadURL(storageRef);
		return url;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export {uploadPostImage, getImageUrl,uploadImageGetUrl};