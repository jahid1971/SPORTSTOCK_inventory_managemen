/* eslint-disable @typescript-eslint/no-explicit-any */

// api builder for create,
export const createApiBuilder = (url: string) => {
    return (data: any) => ({
        url: url,
        method: "POST",
        body: data,
    });
};

// api builder for update
export const updateApiBuilder = (url: string, method = "PATCH") => {
    return (args: { data?: any; id?: string }) => ({
        url: `${url}/${args?.id}`,
        method: method,
        body: args?.data,
    });
};

// api builder for delete
export const deleteApiBuilder = (url: string) => {
    return (args: { id?: string }) => ({
        url: `${url}/${args?.id}`,
        method: "DELETE",
    });
};

// api builder for query
import { TQueryParam } from "@/types/global.types";

export const queryApiBuilder = (url: string) => {
    return (args?: TQueryParam[]) => {
        const params = new URLSearchParams();

        if (args) {
            args.forEach((item: TQueryParam) => {
                params.append(item.name, item.value as string);
            });
        }

        return {
            url: url,
            method: "GET",
            params: params,
        };
    };
};

// api builder for single query
export const singleQueryApiBuilder = (url: string) => {
    return (id: string) => ({
        url: `${url}/${id}`,
        method: "GET",
    });
};
