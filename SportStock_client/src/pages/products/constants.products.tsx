// import { useCurrentUser } from "@/redux/Hooks";

// const user = useCurrentUser()
// const role = user?.role


// const allColumnDefs = [
//     {
//         headerCheckboxSelection: true,
//         checkboxSelection: true,
//         maxWidth: 50,
//     },
//     {
//         headerName: "Product Name",
//         field: "name",
//     },
//     {
//         field: "image",
//         maxWidth: role !== userRole.SELLER ? 80 : undefined,
//         cellRenderer: (params: any) => {
//             return params?.data?.image ? (
//                 <img src={params?.data?.image} alt="product" className="size-10 rounded-full" />
//             ) : undefined;
//         },
//     },

//     { field: "price", maxWidth: role !== userRole.SELLER ? 100 : undefined },
//     { field: "quantity", maxWidth: role !== userRole.SELLER ? 100 : undefined },
//     { field: "branch" },
//     {
//         headerName: "Update",
//         cellRenderer: (params: ICellRendererParams<IRow>) =>
//             user?.role !== userRole.SELLER && <UpdateProduct params={params} />,
//     },
//     {
//         headerName: "Sell",
//         cellRenderer: SellProduct,
//     },
//     // {
//     //     headerName: "Delete",
//     //     cellRenderer: (params: ICellRendererParams<IRow>) =>
//     //         user?.role !== userRole.SELLER && <DeleteButton params={params} />,
//     // },
// ];

// const getColumnDefsForRole = (role: TUserRole) => {
//     if (role === userRole.SELLER) {
//         return allColumnDefs.filter(
//             (col) =>
//                 col.field !== "branch" && col.headerName !== "Update" && col.checkboxSelection !== true
//         );
//     } else return allColumnDefs;
// };

// const columnDefs = useMemo(() => getColumnDefsForRole(role), [role]);