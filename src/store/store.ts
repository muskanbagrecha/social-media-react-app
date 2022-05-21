import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-action/authSlice";
import allUsersReducer from './users-action/allUsersSlice';
import allPostsReducer from './posts-action/allPosts';
import allModalsReducer from './modal-action/modalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        allUsers: allUsersReducer,
        allPosts: allPostsReducer,
        modal: allModalsReducer,
    }
})

export type IRootState = ReturnType<typeof store.getState>;