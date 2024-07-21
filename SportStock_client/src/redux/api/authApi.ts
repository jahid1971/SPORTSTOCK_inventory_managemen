import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder } from "@/utls/api";
import { tagTypes } from "../redux.constants";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        logIn: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),

        changePassword: createApiBuilder(builder, "/auth/change-password", [
            tagTypes.users,
        ]),
    }),
});

export const { useLogInMutation, useChangePasswordMutation } = authApi;
