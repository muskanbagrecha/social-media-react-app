import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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

export {uploadPostImage, getImageUrl};