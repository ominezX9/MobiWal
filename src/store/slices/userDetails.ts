import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";
import { AnyObject } from "types/anyObejct";

const nullUser = {
    "id": "",
    "name": "",
    "email": "",
    "phone": "",
    "balance": 0,
    "password": localStorage.getItem("pasword") || "",
}

const userDetails = createSlice({
    name: 'userDetails',
    initialState: nullUser,
    reducers: {
        updateUser(state, action: PayloadAction<typeof nullUser>){
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.balance = action.payload.balance;
            state.password = action.payload.password;
        },
        logoutUser: (state) => {
            localStorage.clear();
            // Instead of reassigning the state, we should reset each property
            state.id = "";
            state.name = "";
            state.email = "";
            state.phone = "";
            state.balance = 0;
            state.password = "";
        }
    },
})

export default userDetails.reducer;
export const getUserDetails = (state: { userDetails: AnyObject }) =>
    state.userDetails;
export const { updateUser, logoutUser } = userDetails.actions;