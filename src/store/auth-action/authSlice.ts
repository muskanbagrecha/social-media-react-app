import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInterface } from '../posts-action/allPosts';
import { updateUserDB } from "../../firebase/firebase-firestore"
export interface User{
    uid: string | undefined ;
    email: string | null | undefined;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
    bio: string | null | undefined;
    portfolio: string | null | undefined;
    backgroundImageURL: string | null | undefined;
}

export interface AuthSliceState {
    authUser: User | null | undefined;
    followersList: User[] | null | undefined;
    followingList: User[] | null | undefined;
    likesList: string[] | null | undefined;
    bookmarkList: string[] | null | undefined;
    postsList: PostInterface[] | null | undefined;
    isLoading: boolean;
    error: string;
}

export const initialState : AuthSliceState = {
	authUser: null,
    followersList: [],
    followingList: [],
    postsList: [],
    likesList: [],
    bookmarkList: [],
	isLoading: false,
	error: "",
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUser: (state, action : PayloadAction<AuthSliceState | null>) => {
			state.authUser = action.payload?.authUser;
            state.followersList = action.payload?.followersList;
            state.followingList = action.payload?.followingList;
            state.bookmarkList=action.payload?.bookmarkList;
            state.likesList=action.payload?.likesList;

		},
		setIsLoading: (state, action : PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
        setError: (state, action : PayloadAction<string>) => {
			state.error = action.payload;
		},
        setFollowersList: (state, action : PayloadAction<User[]>) => {
            state.followersList = action.payload;
        },
        setFollowingList: (state, action : PayloadAction<User[] | null>) => {
            state.followingList = action.payload;
        },
        setPostsList:(state,action:PayloadAction<PostInterface[] | null>)=>{
            state.postsList=action.payload;
        },
        setLikesList:(state,action:PayloadAction<string[] | null>)=>{
            state.likesList=action.payload;
        },
        setBookmarkList:(state,action:PayloadAction<string[] | null>)=>{
            state.bookmarkList=action.payload;
        },
        updateUserDetails: (state, action) => {
            updateUserDB({ ...state.authUser, ...action.payload });
            state.authUser = { ...state.authUser, ...action.payload };
        },
        setPhotoURL:(state, action)=>{
            state.authUser=action.payload;
        },
        resetAuthState: (state) => {
			state.authUser = null;
			state.followersList = [];
			state.followingList = [];
			state.postsList = [];
			state.likesList = [];
			state.bookmarkList = [];
		},
	},
});

export const { setAuthUser, setIsLoading, setError, setFollowingList,setPostsList, updateUserDetails, setBookmarkList, setLikesList, setFollowersList,setPhotoURL, resetAuthState } = authSlice.actions;

export default authSlice.reducer;