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
        viewMyTransactions: builder.query<AnyObject, null>({
            query: () => ({
                url: `/transactions`,
            }),
            providesTags: ["TRANS"],
        }),
        makeATransfer: builder.mutation<AnyObject, { userId: string; recipientId: string; amount: number, date: string, type: string }>({
            query: (args) => ({
                url: `/transactions`,
                method: "POST",
                body: JSON.stringify({
                    userId: args.userId,
                    recipientId: args.recipientId,
                    amount: args.amount,
                    date: args.date,
                    type: args.type
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["TRANS"],
        }),
        viewMyBills : builder.query<AnyObject, null>({
            query: () => ({
                url: `/bills`,
            }),
            providesTags: ["TRANS"],
        }),
       
    })
})

export default transactionApi;
export const {
    useViewMyTransactionsQuery,
    useLazyViewMyTransactionsQuery,
    useMakeATransferMutation,
    useViewMyBillsQuery,
    useLazyViewMyBillsQuery
} = transactionApi