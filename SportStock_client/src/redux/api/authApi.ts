import { baseApi } from "@/redux/api/baseApi";
import { createApiBuilder, queryApiBuilder } from "@/utls/api";
import { tagTypes } from "../redux.constants";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // logIn: builder.mutation({
        //     query: (userInfo) => ({
        //         url: "/auth/login",
        //         method: "POST",
        //         body: userInfo,
        //     }),
        // }),

        logIn: createApiBuilder(builder, "/auth/login", [tagTypes.users], {
            credentials: true,
        }),

        logOut: createApiBuilder(
            builder,
            "/auth/logout",
            [...Object.values(tagTypes)],
            {
                credentials: true,
            }
        ),

        changePassword: createApiBuilder(builder, "/auth/change-password", [
            tagTypes.users,
        ]),

        getMe: queryApiBuilder(builder, "/auth/me", [tagTypes.users], {
            credentials: true,
        }),

        forgotPassword: builder.mutation({
            query: (email: string) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),

        resetPassword: builder.mutation({
            query: (data: { id: string; token: string; newPassword: string }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useLogInMutation,
    useChangePasswordMutation,
    useGetMeQuery,
    useLogOutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
