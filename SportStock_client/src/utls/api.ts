// /* eslint-disable @typescript-eslint/no-explicit-any */

// // api builder for create,
// export const createApiBuilder = (url: string) => {
//     return (data: any) => ({
//         url: url,
//         method: "POST",
//         body: data,
//     });
// };

// // api builder for update
// export const updateApiBuilder = (url: string, method = "PATCH") => {
//     return (args: { data?: any; id?: string }) => ({
//         url: `${url}/${args?.id}`,
//         method: method,
//         body: args?.data,
//     });
// };

// // api builder for delete
// export const deleteApiBuilder = (url: string) => {
//     return (args: { id?: string }) => ({
//         url: `${url}/${args?.id}`,
//         method: "DELETE",
//     });
// };

// // api builder for query
// import { TQueryParam } from "@/types/global.types";

// export const queryApiBuilder = (url: string) => {
//     return (args?: TQueryParam[]) => {
//         const params = new URLSearchParams();

//         if (args) {
//             args.forEach((item: TQueryParam) => {
//                 params.append(item.name, item.value as string);
//             });
//         }

//         return {
//             url: url,
//             method: "GET",
//             params: params,
//         };
//     };
// };

// // api builder for single query
// export const singleQueryApiBuilder = (url: string) => {
//     return (id: string) => ({
//         url: `${url}/${id}`,
//         method: "GET",
//     });
// };

/* eslint-disable @typescript-eslint/no-explicit-any */

import { TResponse } from "@/types/common";
import { TQueryParam } from "@/types/global.types";
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
    options: { method?: string; contentType?: string } = {}
) => {
    return build.mutation({
        query: (args: any) => {
            console.log("args in createApiBuilder", args);
            return {
                url: url,
                method: "POST",
                body: args,
                contentType: options.contentType ?? "application/json",
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const updateApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes: string[],
    options: { method?: string; contentType?: string } = {}
) => {
    return build.mutation<TResponse<T>, TUpdateArgs>({
        query: (args: { data?: any; id?: string }) => {
            console.log("args in updateApiBuilderrrrr", args);

            return {
                url: `${url}${args.id ? `/${args.id}` : ""}`,
                method: options.method ?? "PATCH",
                data: args?.data,
                contentType: options.contentType ?? "application/json",
            };
        },
        invalidatesTags: tagTypes,
    });
};

export const queryApiBuilder = <T>(
    build: IBuildApi,
    url: string,
    tagTypes?: string[]
) => {
    return build.query<TResponse<T>, Record<string, any> | undefined>({
        query: (args?: TQueryParam[]) => {
            const params = new URLSearchParams();

            if (args) {

                console.log("args in queryApiBuilder", args);
                args.forEach((item: any) => {
                    params.append(item.name, item.value as string);
                });
            }
            return {
                url: url,
                method: "GET",
                params: params,
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
            return {
                url:
                    args?.id && args.id_2
                        ? `${url}/${args.id}/${args.id_2}`
                        : `${url}/${args.id}`,
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
