import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants.ts";
import { AnyObject } from "types/anyObejct";

type SignupFormValues = {
    name: string
    email: string;
    password: string;
    acc_no: string;
    balance: number;
};
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
        signup: builder.mutation<AnyObject, SignupFormValues>({
            query: ({ name, email, password, acc_no, balance }) => ({
                url: "/users",
                method: "POST",
                body: JSON.stringify({ name, email, password, acc_no, balance }),
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