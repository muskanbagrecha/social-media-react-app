import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostInterface{
    postId: string;
    caption: string;
    image: string;
    uid: string;
    createdAt: any;
    totalLikes: number;
}

const initialState : {allPosts: PostInterface[] | null}= {
    allPosts: [],
};

const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        setAllPosts: (state, action : PayloadAction<PostInterface[]>) => {
            state.allPosts = action.payload;
        },
    }
})

export const { setAllPosts } = allPostsSlice.actions;
export default allPostsSlice.reducer;