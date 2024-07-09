// import { baseApi } from "@/redux/api/baseApi";
// import { TQueryParam, TResponseRedux } from "@/types/global.types";

// const adminApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
// // get all users..........................................get all users
//         getUsers: builder.query({
//             query: (args) => {
//                 const params = new URLSearchParams();

//                 if (args) {
//                     args.forEach((item: TQueryParam) => {
//                         params.append(item.name, item.value as string);
//                     });
//                 }

//                 return {
//                     url: "/users",
//                     method: "GET",
//                     // params: params,
//                 };
//             },

//             transformResponse: (response: TResponseRedux<T[]>) => {
//                 return {
//                     data: response.data,
//                     meta: response.meta,
//                 };
//             },
//             providesTags: ["userStatus"],
//         }),


//     }),
// });

// export const { useGetUsersQuery  } = adminApi;
