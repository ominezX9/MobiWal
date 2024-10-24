import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slices/userDetails";

export const store = configureStore({
    reducer: {
        "userDetails" : userDetails
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;