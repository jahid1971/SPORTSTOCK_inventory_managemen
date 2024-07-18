import { baseApi } from "@/redux/api/baseApi";
import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addStock: builder.mutation({
            query: createApiBuilder("stocks"),
            invalidatesTags: ["stocks"],
        }),

        adjustStock: builder.mutation({
            query: createApiBuilder("stocks/adjust"),
            invalidatesTags: ["stocks"],
        }),

        transferStock: builder.mutation({
            query: createApiBuilder("stocks/transfer"),
            invalidatesTags: ["stocks"],
        }),

        getAllStocks: builder.query({
            query: queryApiBuilder("stocks"),
            providesTags: ["stocks"],
        }),

        getStockHistory: builder.query({
            query: queryApiBuilder("history"),
            providesTags: ["stockHistory"],
        }),
    }),
});

export const {
    useAddStockMutation,
    useGetAllStocksQuery,
    useAdjustStockMutation,
    useTransferStockMutation,
    useGetStockHistoryQuery,
} = adminApi;
