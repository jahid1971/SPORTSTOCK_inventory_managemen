import { baseApi } from "@/redux/api/baseApi";
import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";
import { tagTypes } from "../redux.constants";

const stockApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // addStock: builder.mutation({
        //     query: createApiBuilder("stocks"),
        //     invalidatesTags: ["stocks"],
        // }),

        addStock: createApiBuilder(builder, "stocks", [tagTypes.stocks]),

        // adjustStock: builder.mutation({
        //     query: createApiBuilder("stocks/adjust"),
        //     invalidatesTags: ["stocks"],
        // }),

        // transferStock: builder.mutation({
        //     query: createApiBuilder("stocks/transfer"),
        //     invalidatesTags: ["stocks"],
        // }),

        // getAllStocks: builder.query({
        //     query: queryApiBuilder("stocks"),
        //     providesTags: ["stocks"],
        // }),

        // getStockHistory: builder.query({
        //     query: queryApiBuilder("history"),
        //     providesTags: ["stockHistory"],
        // }),

        adjustStock: createApiBuilder(builder, "stocks/adjust", [
            tagTypes.stocks,
        ]),

        transferStock: createApiBuilder(builder, "stocks/transfer", [
            tagTypes.stocks,
        ]),

        getAllStocks: queryApiBuilder(builder, "stocks", [tagTypes.stocks]),

        getStockHistory: queryApiBuilder(builder, "history", [
            tagTypes.stockHistory,
            tagTypes.stocks,
        ]),
        deleteStock: deleteApiBuilder(builder, "stocks/delete", [
            tagTypes.stocks,
        ]),
        deleteStockHistory: deleteApiBuilder(builder, "history/delete", [
            tagTypes.stockHistory,
            tagTypes.stocks,
        ]),

        getAdjustStockHistory: queryApiBuilder(builder, "history/adjusted", [
            tagTypes.stockHistory,
            tagTypes.stocks,
        ]),
        getTransferStockHistory: queryApiBuilder(
            builder,
            "history/transferred",
            [tagTypes.stockHistory, tagTypes.stocks]
        ),

        getStocksBarChart: queryApiBuilder(builder, "stocks/bar-chart", [
            tagTypes.stocks,
        ]),

        getStockPieChart: queryApiBuilder(builder, "stocks/pie-chart", [
            tagTypes.stocks,
        ]),

        getStockLineChart: queryApiBuilder(builder, "history/line-chart", [
            tagTypes.stockHistory,
            tagTypes.stocks,
        ]),
    }),
});

export const {
    useAddStockMutation,
    useGetAllStocksQuery,
    useAdjustStockMutation,
    useTransferStockMutation,
    useGetStockHistoryQuery,
    useDeleteStockMutation,
    useDeleteStockHistoryMutation,
    useGetAdjustStockHistoryQuery,
    useGetTransferStockHistoryQuery,
    useGetStocksBarChartQuery,
    useGetStockPieChartQuery,
    useGetStockLineChartQuery,
} = stockApi;
