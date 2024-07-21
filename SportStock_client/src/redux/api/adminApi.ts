import { baseApi } from "@/redux/api/baseApi";
import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";
import { tagTypes } from "../redux.constants";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // createBranch: builder.mutation({
        //     query: createApiBuilder("branches/create-branch"),
        //     invalidatesTags: ["branches"],
        // }),

        createBranch: createApiBuilder(builder, "branches/create-branch", [
            tagTypes.branches,
        ]),
        // getAllBranches: builder.query({
        //     query: queryApiBuilder("branches"),
        //     providesTags: ["branches"],
        // }),

        getAllBranches: queryApiBuilder(builder, "branches", [
            tagTypes.branches,
        ]),

        // updateBranchStatus: builder.mutation({
        //     query: updateApiBuilder("branches/update-branch-status"),
        //     invalidatesTags: ["branches"],
        // }),

        updateBranchStatus: updateApiBuilder(
            builder,
            "branches/update-branch-status",
            [tagTypes.branches]
        ),
        // // deleteBranch: builder.mutation({

        // deleteBranch: builder.mutation({
        //     query: deleteApiBuilder("branches/delete-branch"),
        //     invalidatesTags: ["branches"],
        // }),

        deleteBranch: deleteApiBuilder(builder, "branches/delete-branch", [
            tagTypes.branches,
        ]),
    }),
});

export const {
    useCreateBranchMutation,
    useGetAllBranchesQuery,
    useUpdateBranchStatusMutation,
    useDeleteBranchMutation,
} = adminApi;
