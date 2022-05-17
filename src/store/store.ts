import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-action/authSlice";
import allUsersReducer from './users-action/allUsersSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        allUsers: allUsersReducer,
    }
})

export type IRootState = ReturnType<typeof store.getState>;