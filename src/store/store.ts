import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-action/authSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export type IRootState = ReturnType<typeof store.getState>;