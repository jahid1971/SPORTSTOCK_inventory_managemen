import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder, queryApiBuilder } from "@/utls/api";
import { tagTypes } from "../redux.constants";

const saleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // createSale: builder.mutation({
        //     query: createApiBuilder("sales/create-sale"),
        //     invalidatesTags: ["sales","products"],
        // }),
        // getSalesData: builder.query({
        //     query: queryApiBuilder("sales"),
        //     providesTags: ["sales"],
        // }),
        // getSalesHistory: builder.query({
        //     query: queryApiBuilder("sales/sales-history"),
        //     providesTags: ["sales"],
        // })

        createSale: createApiBuilder(builder, "sales/create-sale", [
            tagTypes.sales,
            tagTypes.products,
        ]),
        getSalesData: queryApiBuilder(builder, "sales", [tagTypes.sales]),
        getSalesHistory: queryApiBuilder(builder, "sales/sales-history", [
            tagTypes.sales,
        ]),
    }),
});

export const {
    useCreateSaleMutation,
    useGetSalesDataQuery,
    useGetSalesHistoryQuery,
} = saleApi;
