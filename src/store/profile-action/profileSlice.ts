import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInterface } from '../posts-action/allPosts';
// export interface Profile{

//     followersList: User[] | null | undefined;
//     followingList: User[] | null | undefined;
//     postsList: PostInterface[] | null | undefined;
// }

// export const initialState : AuthSliceState = {
// 	authUser: null,
//     followersList: [],
//     followingList: [],
//     postsList: [],
// 	isLoading: false,
// 	error: "",
// };

// const authSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	reducers: {
// 		setAuthUser: (state, action : PayloadAction<AuthSliceState | null>) => {
// 			state.authUser = action.payload?.authUser;
//             state.followersList = action.payload?.followersList
//             state.followingList = action.payload?.followingList
// 		},
// 		setIsLoading: (state, action : PayloadAction<boolean>) => {
// 			state.isLoading = action.payload;
// 		},
//         setError: (state, action : PayloadAction<string>) => {
// 			state.error = action.payload;
// 		},
//         setFollowingList: (state, action : PayloadAction<User[] | null>) => {
//             state.followingList = action.payload;
//         },
//         setPostsList:(state,action:PayloadAction<PostInterface[] | null>)=>{
//             state.postsList=action.payload;
//         }
// 	},
// });

// export const { setAuthUser, setIsLoading, setError, setFollowingList,setPostsList } = authSlice.actions;

// export default authSlice.reducer;