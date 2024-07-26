export function debounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): T {
    let timer: NodeJS.Timeout | null = null;

    return ((...args: any[]) => {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => callback(...args), delay);
    }) as T;
}

export function dateFormatter(isoDateString: string) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
    const month = monthFormatter.format(date);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function tableSerial(params: any[], index: number) {
    const pageParam = params.find((param) => param.name === "page");
    const limitParam = params.find((param) => param.name === "limit");

    const page = pageParam ? parseInt(pageParam.value, 10) : 1;
    const limit = limitParam ? parseInt(limitParam.value, 10) : 5;

    return (page - 1) * limit + index + 1 + "";
}

export const replaceWithNewValue = (
    array: any[],
    queryProperty: string,
    value: any
) => {
    const filteredArray = array.filter(
        (item) => item["name"] !== queryProperty
    );

    return [...filteredArray, { name: queryProperty, value }];
};

// hooks/useDebouncedParams.ts
import { useEffect, useState } from "react";

export function useDebouncedParams<T>(params: T, delay = 500) {
    const [debouncedParams, setDebouncedParams] = useState(params);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedParams(params), delay);

        return () => {
            clearTimeout(handler);
        };
    }, [params, delay]);

    return debouncedParams;
}


export const updateParam = (params: any[], name: string, value: any) => [
    ...params.filter((item) => item.name !== name),
    { name, value },
  ];
// type TDebouncedProps = {
//     searchQuery: any;
//     delay: number;
// };
// export const useDebounced = ({ searchQuery, delay }: TDebouncedProps) => {
//     const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedValue(searchQuery), delay);
//         return () => clearTimeout(handler);
//     }, [searchQuery, delay]);

//     return debouncedValue;
// };


export const consoleFormData = (formData: FormData) => {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
}