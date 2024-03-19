import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TUser } from "@/types/global.types";
import { mutationApiBuilder } from "@/utls/api";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/users",
                    method: "GET",
                    params: params,
                };
            },

            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        createBranch: builder.mutation({
            query: mutationApiBuilder("branches/create-branch"),
        }),
    }),
});

export const { useGetAllUsersQuery, useCreateBranchMutation } = adminApi;
