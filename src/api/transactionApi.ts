import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants.ts";
import { AnyObject } from "yup";

type Values = {
    "id": "1",
    "userId": 1,
    "recipientId": 2,
    "amount": 200,
    "date": "2024-10-24T10:00:00",
    "type": "transfer"
};

const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["TRANS"],
    endpoints: (builder) => ({
        viewMyTransactions: builder.query<void, string>({
            query: (userId) => ({
                url: `/transactions?userId=${userId}`,
            }),
            providesTags: ["TRANS"],
        }),
        makeATransfer: builder.mutation<void, { userId: string; recipientId: string; amount: number }>({
            query: (args) => ({
                url: `/transactions`,
                method: "POST",
                body: JSON.stringify({
                    userId: args.userId,
                    recipientId: args.recipientId,
                    amount: args.amount
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["TRANS"],
        })
        
       
    })
})

export default transactionApi;
export const {
    useViewMyTransactionsQuery,
    useLazyViewMyTransactionsQuery,
} = transactionApi