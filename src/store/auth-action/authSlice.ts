import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User{
    uid: string | undefined;
    email: string | null | undefined;
    displayName: string | null | undefined;
    photoURL: string | null | undefined;
    bio: string | null | undefined;
    portfolio: string | null | undefined;
    backgroundImageURL: string | null | undefined;
    followers: number | null | undefined;
    following: number | null | undefined;
    posts: number | null | undefined;
}

interface AuthSliceState {
    authUser: User | null;
    isLoading: boolean;
    error: string;
}

const initialState : AuthSliceState = {
	authUser: null,
	isLoading: false,
	error: "",
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUser: (state, action : PayloadAction<User | null>) => {
			state.authUser = action.payload;
		},
		setIsLoading: (state, action : PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
        setError: (state, action : PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setAuthUser, setIsLoading, setError } = authSlice.actions;

export default authSlice.reducer;