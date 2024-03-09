import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerSeller: builder.mutation({
            query: (data) => ({
                url: "auth/register-seller",
                method: "POST",
                body: data,
            }),
        }),
        logIn: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),
    }),
});

export const { useLogInMutation, useRegisterSellerMutation } = authApi;
