import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants.ts";

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
        signin: builder.mutation<void, LoginFormValues>({
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
        login: builder.query<void, LoginFormValues>({
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

} = authApi