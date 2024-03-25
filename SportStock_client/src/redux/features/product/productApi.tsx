import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.types";
import { createApiBuilder, queryApiBuilder, singleQueryApiBuilder, updateApiBuilder } from "@/utls/api";

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

        createSportType: builder.mutation({
            query: (data) => ({
                url: "sport-types/create-sport-type",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["sportType"],
        }),

        getAllSportTypes: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/sport-types",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["sportType"],
        }),

        addBrand: builder.mutation({
            query: createApiBuilder("brands/add-brand"),
            invalidatesTags: ["brands"],
        }),

        getAllBrandNames: builder.query({
            query: queryApiBuilder("brands"),
            providesTags: ["brands"],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useCreateSportTypeMutation,
    useGetAllSportTypesQuery,
    useAddBrandMutation,
    useGetAllBrandNamesQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetSingleProductQuery,
} = productApi;
