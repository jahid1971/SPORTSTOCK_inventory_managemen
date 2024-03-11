import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.types";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        
    }),
});

export const { useCreateSportTypeMutation,useGetAllSportTypesQuery } = authApi;
