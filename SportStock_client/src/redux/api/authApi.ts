import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder } from "@/utls/api";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // registerSeller: builder.mutation({
        //     query: (data) => ({
        //         url: "auth/register-seller",
        //         method: "POST",
        //         body: data,
        //     }),
        // }),
        logIn: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),

        changePassword: builder.mutation({
            query: createApiBuilder("/auth/change-password"),
        }),
    }),
});

export const { useLogInMutation, useChangePasswordMutation } = authApi;
