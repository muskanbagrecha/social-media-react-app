import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../auth-action/authSlice";

const initialState : {allUsers: User[] | null}= {
    allUsers: [],
};

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        setAllUsers: (state, action : PayloadAction<User[]>) => {
            state.allUsers = action.payload;
        },
    }
})

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;