import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder, queryApiBuilder, updateApiBuilder } from "@/utls/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create branch manager..........................................create branch manager
        createBranchManager: builder.mutation({
            query: createApiBuilder("users/create-branch-manager"),
            invalidatesTags: ["users"],
        }),

        // create seller..........................................create seller
        createSeller: builder.mutation({
            query: createApiBuilder("users/create-seller"),
            invalidatesTags: ["users"],
        }),

        //  delete user..........................................delete user
        deleteUser: builder.mutation({
            query: updateApiBuilder("users/delete-user"),
            invalidatesTags: ["users"],
        }),

        //  get all users..........................................get all users
        getAllUsers: builder.query({
            query: queryApiBuilder("users"),
            providesTags: ["users"],
        }),

        // update user status...................................update User Status
        updateUserStatus: builder.mutation({
            query: updateApiBuilder("users/update-status"),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useCreateBranchManagerMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useCreateSellerMutation,
    useUpdateUserStatusMutation,
} = userApi;
