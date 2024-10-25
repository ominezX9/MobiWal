import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slices/userDetails";
import headerControls from "./slices/headerControls";

import {
    authApi,
    usersApi,
    transactionApi
} from "api";

const middleware = [
    authApi.middleware,
    usersApi.middleware,
    transactionApi.middleware,
]

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        "userDetails" : userDetails,
        "headerControls": headerControls
    },
    middleware(getDefaultMiddleware) { 
        return getDefaultMiddleware().concat(middleware);
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;