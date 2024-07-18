import { baseApi } from "@/redux/api/baseApi";
import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";

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

        updateBranchStatus: builder.mutation({
            query: updateApiBuilder("branches/update-branch-status"),
            invalidatesTags: ["branches"],
        }),

        deleteBranch: builder.mutation({
            query: deleteApiBuilder("branches/delete-branch"),
            invalidatesTags: ["branches"],
        }),
    }),
});

export const {
    useCreateBranchMutation,
    useGetAllBranchesQuery,
    useUpdateBranchStatusMutation,
    useDeleteBranchMutation,
} = adminApi;
