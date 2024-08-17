import { baseApi } from "@/redux/api/baseApi";
import {
    createApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utls/api";
import { tagTypes } from "../redux.constants";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: createApiBuilder(
            builder,
            "users/create-admin",
            [tagTypes.users],
            { contentType: false }
        ),

        createBranchManager: createApiBuilder(
            builder,
            "users/create-branch-manager",
            [tagTypes.users],
            { contentType: false }
        ),

        createSeller: createApiBuilder(
            builder,
            "users/create-seller",
            [tagTypes.users],
            { contentType: false }
        ),

        updateSeller: updateApiBuilder(
            builder,
            "users/update-seller",
            [tagTypes.users],
            { contentType: false }
        ),

        updateAdmin: updateApiBuilder(
            builder,
            "users/update-admin",
            [tagTypes.users],
            { contentType: false }
        ),

        updateBranchManager: updateApiBuilder(
            builder,
            "users/update-branch-manager",
            [tagTypes.users],
            { contentType: false }
        ),

        deleteUser: updateApiBuilder(builder, "users/delete-user", [
            tagTypes.users,
        ]),

        getAllUsers: queryApiBuilder(builder, "users", [tagTypes.users]),

        getuserById: singleQueryApiBuilder(builder, "users", [tagTypes.users]),

        updateUserStatus: updateApiBuilder(builder, "users/update-status", [
            tagTypes.users,
        ]),
    }),
});

export const {
    useGetAllUsersQuery,
    useCreateSellerMutation,
    useCreateAdminMutation,
    useCreateBranchManagerMutation,
    useUpdateSellerMutation,
    useUpdateAdminMutation,
    useUpdateBranchManagerMutation,
    useUpdateUserStatusMutation,
    useDeleteUserMutation,
    useGetuserByIdQuery,
} = userApi;
