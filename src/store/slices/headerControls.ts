import {createSlice, PayloadAction } from "@reduxjs/toolkit";

const headerControlsSlice = createSlice({
    name: 'headerControls',
    initialState: {
        headerTitle: "",
        showBackButton: false,
        headToUrl: ""
    },
    reducers: {
        updateHeaderTitle: (state, action:PayloadAction<string>) => {
            state.headerTitle = action.payload;
        },
        showBackButton: (state, action: PayloadAction<string | undefined>) => {
            state.showBackButton = true;
            if(action.payload){
                state.headToUrl = action.payload;
            }else{
                state.headToUrl = "";
            }
        },
        hideBackButton: (state) => {
            state.showBackButton = false;
        }
    },
}) ;

export const {
    updateHeaderTitle,
    showBackButton,
    hideBackButton
} = headerControlsSlice.actions;

export default headerControlsSlice.reducer;