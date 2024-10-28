import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants.ts";
import { AnyObject } from "types/anyObejct";



const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["TRANS"],
    endpoints: (builder) => ({
        viewMyTransactions: builder.query<AnyObject, string>({
            query: (userId) => ({
                url: `/transactions?userId=${userId}`,
            }),
            providesTags: ["TRANS"],
        }),
        makeATransfer: builder.mutation<AnyObject, { userId: string; recipientId: string; amount: number }>({
            query: (args) => ({
                url: `/transactions`,
                method: "POST",
                body: JSON.stringify({
                    userId: args.userId,
                    recipientId: args.recipientId,
                    balance: args.amount
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["TRANS"],
        }),
       
    })
})

export default transactionApi;
export const {
    useViewMyTransactionsQuery,
    useLazyViewMyTransactionsQuery,
    useMakeATransferMutation,
} = transactionApi