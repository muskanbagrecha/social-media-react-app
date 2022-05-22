import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User{
    uid: string | undefined;
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
    postsList: User[] | null | undefined;
    isLoading: boolean;
    error: string;
}

export const initialState : AuthSliceState = {
	authUser: null,
    followersList: [],
    followingList: [],
    postsList: [],
	isLoading: false,
	error: "",
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUser: (state, action : PayloadAction<AuthSliceState | null>) => {
			state.authUser = action.payload?.authUser;
            state.followersList = action.payload?.followersList
            state.followingList = action.payload?.followingList
		},
		setIsLoading: (state, action : PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
        setError: (state, action : PayloadAction<string>) => {
			state.error = action.payload;
		},
        setFollowingList: (state, action : PayloadAction<User[] | null>) => {
            state.followingList = action.payload;
        }
	},
});

export const { setAuthUser, setIsLoading, setError, setFollowingList } = authSlice.actions;

export default authSlice.reducer;