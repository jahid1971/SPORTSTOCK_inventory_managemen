import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.types";
import { mutationApiBuilder, queryApiBuilder } from "@/utls/api";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: mutationApiBuilder("products/create-product"),
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
            query: mutationApiBuilder("brands/add-brand"),
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
    useCreateSportTypeMutation,
    useGetAllSportTypesQuery,
    useAddBrandMutation,
    useGetAllBrandNamesQuery,
} = productApi;
