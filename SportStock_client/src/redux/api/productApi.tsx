/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.types";
import {
    createApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";
import { tagTypes } from "../redux.constants";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: createApiBuilder(
            builder,
            "products/create-product",
            [tagTypes.products],
            { contentType: false }
        ),

        getProducts: queryApiBuilder(builder, "products", [tagTypes.products]),

        getSingleProduct: singleQueryApiBuilder(builder, "products", [
            tagTypes.products,
        ]),

        deleteProduct: updateApiBuilder(builder, "products/delete-product", [
            tagTypes.products,
        ]),

        updateProduct: updateApiBuilder(builder, "products", [
            tagTypes.products,
        ]),

        createCategory: createApiBuilder(
            builder,
            "categories/create-category",
            [tagTypes.category]
        ),

        getAllCategories: queryApiBuilder(builder, "categories", [
            tagTypes.category,
        ]),

        addBrand: createApiBuilder(builder, "brands/add-brand", [
            tagTypes.brands,
        ]),

        getAllBrandNames: queryApiBuilder(builder, "brands", [tagTypes.brands]),

        multiProductDelete: updateApiBuilder(
            builder,
            "products/multi-delete/batch",
            [tagTypes.products]
        ),

        getDashboardMeta: queryApiBuilder(builder, "stocks/dashboard-cards", [
            tagTypes.products,
        ]),

        getStockAvailability: queryApiBuilder(
            builder,
            "products/stock-availability",
            [tagTypes.stocks]
        ),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useGetAllBrandNamesQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetSingleProductQuery,
    useMultiProductDeleteMutation,
    useGetDashboardMetaQuery,
    useAddBrandMutation,
    useGetStockAvailabilityQuery,
} = productApi;
