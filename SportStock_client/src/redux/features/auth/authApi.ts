import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),
    }),
});

export const { useLogInMutation } = authApi;
