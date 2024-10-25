import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants";
import {UserDetailsResponse} from "types/UserDetailsResponse";

const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL,
     }),
    tagTypes: ["USER"],
    endpoints: builder => ({
        getUser: builder.query<UserDetailsResponse, string>({
            query: (password) => `users?password=${password}`,
            providesTags: ["USER"]
        }),
    }),
})

export default usersApi;
export const {  
    useGetUserQuery,
    useLazyGetUserQuery
} = usersApi;