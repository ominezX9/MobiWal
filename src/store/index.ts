import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slices/userDetails";

import {
    authApi,
    usersApi
} from "api";

const middleware = [
    authApi.middleware,
    usersApi.middleware,
]

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        "userDetails" : userDetails
    },
    middleware(getDefaultMiddleware) { 
        return getDefaultMiddleware().concat(middleware);
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;