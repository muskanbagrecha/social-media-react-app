import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../auth-action/authSlice";

const initialState : User[] = [];

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {}
})

export default allUsersSlice.reducer;