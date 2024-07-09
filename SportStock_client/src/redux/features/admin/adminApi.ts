import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder, queryApiBuilder } from "@/utls/api";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
        createBranch: builder.mutation({
            query: createApiBuilder("branches/create-branch"),
            invalidatesTags: ["branches"],
        }),
        getAllBranches: builder.query({
            query: queryApiBuilder("branches"),
            providesTags: ["branches"],
        }),
    }),
});

export const {  useCreateBranchMutation, useGetAllBranchesQuery } = adminApi;
