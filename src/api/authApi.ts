import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants.ts";
import { AnyObject } from "types/anyObejct";

type LoginFormValues = {
    email: string;
    password: string;
};

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["AUTH"],
    endpoints: (builder) => ({
        signup: builder.mutation<AnyObject, LoginFormValues>({
            query: ({ email, password }) => ({
                url: "/users",
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["AUTH"],
        }),
        login: builder.query<AnyObject, LoginFormValues>({
            query: ({ email, password }) => ({
                url: `/users?email=${email}&password=${password}`,
            }),
            providesTags: ["AUTH"],
        })
    })
})

export default authApi;
export const {
    useLoginQuery,
    useLazyLoginQuery,
    useSignupMutation,

} = authApi