/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../Store";
import { nullifyState, setUser } from "../features/auth/authSlice";
import { tagTypes } from "../redux.constants";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL as string,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        console.log("sending refresh token");

        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
            {
                method: "POST",
                credentials: "include",
            }
        );
        const data = await res.json();
        console.log(data, "refresh token response");

        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(
                setUser({
                    user,
                    token: data.data.accessToken,
                })
            );

            // Retry the initial query with the new token
            // result = await baseQuery(args, api, extraOptions);

            const newHeaders = new Headers((args as any).headers);
            newHeaders.set("authorization", `${data.data.accessToken}`);

            result = await baseQuery(
                {
                    ...args,
                    headers: newHeaders,
                },
                api,
                extraOptions
            );
        } else {
            api.dispatch(nullifyState());
        }
    }

    console.log(result, "============ result baseQuery", " from ", api.endpoint,);
    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: Object.values(tagTypes),
    endpoints: () => ({}),
});
