import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";


const nullUser = {
    "id": "",
    "name": "",
    "email": "",
    "phone": "",
    "balance": "",
    "password": localStorage.getItem("token"),
}

const userDetails = createSlice({
    name: 'userDetails',
    initialState: nullUser,
    reducers: {
        getUserDetails(_state, action: PayloadAction<typeof nullUser>){
            return action.payload;
        },
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
            state = nullUser;
            return state;
        }
    },
})

export const { getUserDetails, updateUser, logoutUser } = userDetails.actions;
export default userDetails.reducer;