/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.types";
import {
    createApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: createApiBuilder("products/create-product"),
            invalidatesTags: ["products"],
        }),

        getProducts: builder.query({
            query: queryApiBuilder("products"),
            providesTags: ["products"],
        }),

        getSingleProduct: builder.query({
            query: singleQueryApiBuilder("products"),
            providesTags: ["products"],
        }),

        deleteProduct: builder.mutation({
            query: updateApiBuilder("products/delete-product", "PUT"),
            invalidatesTags: ["products"],
        }),

        updateProduct: builder.mutation({
            query: updateApiBuilder("products"),
            invalidatesTags: ["products"],
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: "categories/create-category",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["category"],
        }),


        getAllCategories: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/categories",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["category"],
        }),

        addBrand: builder.mutation({
            query: createApiBuilder("brands/add-brand"),
            invalidatesTags: ["brands"],
        }),

        getAllBrandNames: builder.query({
            query: queryApiBuilder("brands"),
            providesTags: ["brands"],
        }),

        multiProductDelete: builder.mutation({
            query: (data: any) => ({
                url: "products/multi-delete/batch",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["products"],
        }),

        getDashboardMeta: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "products/meta",
                    method: "GET",
                    // params: params,
                };
            },
            providesTags: ["products"],
        }),

        getStockAvailability: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/products/stock-availability",
                    method: "GET",
                    params: params,
                };
            },
        }),
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
