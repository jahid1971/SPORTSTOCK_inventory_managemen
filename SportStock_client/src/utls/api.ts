/* eslint-disable @typescript-eslint/no-explicit-any */
export const mutationApiBuilder = (url: string, method = "POST") => {
    return (data: any) => ({
        url: url,
        method: method,
        body: data,
    });
};

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
