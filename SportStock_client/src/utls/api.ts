import { TQueryParam, TResponse } from "@/types/global.types";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

type IBuildApi = EndpointBuilder<any, any, any>;

export type TUpdateArgs = {
    id?: string;
    data: any;
};

// api builder for create,
export const createApiBuilder = (
    build: any,
    url: string,
    tagTypes?: string[],
    customOptions: {
        contentType?: string | boolean;
        credentials?: boolean;
    } = {}
) => {
    const options = {
        contentType: "application/json",
        ...customOptions,
    };

    return build.mutation({
        query: (args: any) => {
            const isFormEncoded =
                options.contentType === "application/x-www-form-urlencoded";
            const body = isFormEncoded
                ? new URLSearchParams(Object.entries(args)).toString()
                : args;

            const headers: Record<string, any> = {};

            if (typeof options.contentType === "string") {
                headers["Content-Type"] = options.contentType;
            }

            return {
                url: url,
                method: "POST",
                body: body,
                credentials: options.credentials ? "include" : undefined,
                headers: headers,
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const updateApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes: string[],
    customOptions: { method?: string; contentType?: string | boolean } = {}
) => {
    const options = {
        method: "PATCH",
        contentType: "application/json",
        ...customOptions,
    };

    return build.mutation<TResponse<T>, TUpdateArgs>({
        query: (args: { data?: any; id?: string }) => {
            const headers: Record<string, any> = {};
            if (
                options.contentType &&
                typeof options.contentType === "string"
            ) {
                headers["Content-Type"] = options.contentType;
            }

            return {
                url: `${url}${args.id ? `/${args.id}` : ""}`,
                method: options.method,
                body: args?.data,
                headers: headers,
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const queryApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes?: string[],
    options: {
        credentials?: boolean;
    } = {}
) => {
    return build.query<TResponse<T>, Record<string, any> | undefined>({
        query: (args?: TQueryParam[]) => {
            const params = new URLSearchParams();

            if (args) {
                args.forEach((item: any) => {
                    params.append(item.name, item.value as string);
                });
            }
            return {
                url: url,
                method: "GET",
                params: params,
                credentials: options.credentials ? "include" : undefined,
            };
        },
        providesTags: tagTypes,
    });
};

export const singleQueryApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes?: string[]
) => {
    return build.query<TResponse<T>, { id?: string; id_2?: string }>({
        query: (args) => {
            let requestUrl = url;

            if (typeof args === "string") {
                requestUrl = `${url}/${args}`;
            } else if (args?.id && args.id_2) {
                requestUrl = `${url}/${args.id}/${args.id_2}`;
            } else if (args?.id) {
                requestUrl = `${url}/${args.id}`;
            }

            return {
                url: requestUrl,
                method: "GET",
            };
        },
        providesTags: tagTypes,
    });
};

export const deleteApiBuilder = (
    build: any,
    url: string,
    tagTypes: string[]
) => {
    return build.mutation({
        query: (id: string) => {
            return {
                url: `${url}/${id}`,
                method: "DELETE",
            };
        },
        invalidatesTags: tagTypes,
    });
};
