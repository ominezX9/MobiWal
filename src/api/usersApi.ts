import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants";
import { AnyObject } from "types/anyObejct";
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
        // updateuser
        updateUserAmountById: builder.mutation<AnyObject, {id: string, amount: number}>({
            query: (args) => ({
                url: `/users/${args.id}`,
                method: "POST",
                body: JSON.stringify({
                    amount: args.amount
                }),
                headers: {
                    "Content-Type": "application/json",
                },

            })
        }),
        updateUserAmountByAcc: builder.mutation<AnyObject, {acc_no: string, amount: number}>({
            query: (args) => ({
                url: `/users?acc_no=${args.acc_no}`,
                method: "POST",
                body: JSON.stringify({
                    amount: args.amount
                }),
                headers: {
                    "Content-Type": "application/json",
                },

            })
        })
    }),
})

export default usersApi;
export const {  
    useGetUserQuery,
    useLazyGetUserQuery,
    useUpdateUserAmountByIdMutation,
    useUpdateUserAmountByAccMutation
} = usersApi;