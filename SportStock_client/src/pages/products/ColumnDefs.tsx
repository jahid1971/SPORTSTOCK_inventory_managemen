


// import { ICellRendererParams } from "@ag-grid-community/core";
// import { useCurrentUser } from "@/redux/Hooks";
// import { TUserRole } from "@/types/global.types";
// import { UpdateProduct } from "@/components/table/products/UpdateProduct";
// import { userRole } from "@/constants/user";
// import { SellProduct } from "@/components/table/products/SellProduct";


// export interface IRow {
//     _id: string;
//     id: string;
//     name: string;
//     image: string;
//     price: number;
//     quantity: number;
//     branch: string;
// }

// const useColumnDefs = () => {
//     const user = useCurrentUser();
//     const role: TUserRole = user?.role;

//     const allColumnDefs = [
//         {
//             headerCheckboxSelection: true,
//             checkboxSelection: true,
//             maxWidth: 50,
//         },
//         {
//             headerName: "Product Name",
//             field: "name",
//         },
//         {
//             field: "image",
//             maxWidth: role !== userRole.SELLER ? 80 : undefined,
//             cellRenderer: (params: any) => {
//                 return params?.data?.image ? (
//                     <img src={params?.data?.image} alt="product" className="size-10 rounded-full" />
//                 ) : undefined;
//             },
//         },
//         { field: "price", maxWidth: role !== userRole.SELLER ? 100 : undefined },
//         { field: "quantity", maxWidth: role !== userRole.SELLER ? 100 : undefined },
//         { field: "branch" },
//         {
//             headerName: "Update",
//             cellRenderer: (params: ICellRendererParams<IRow>) =>
//                 user?.role !== userRole.SELLER && <UpdateProduct params={params} />,
//         },
//         {
//             headerName: "Sell",
//             cellRenderer: SellProduct,
//         },
//     ];

//     const getColumnDefsForRole = (role: TUserRole) => {
//         if (role === userRole.SELLER) {
//             return allColumnDefs.filter(
//                 (col) =>
//                     col.field !== "branch" && col.headerName !== "Update" && col.checkboxSelection !== true
//             );
//         } else return allColumnDefs;
//     };

//     return getColumnDefsForRole(role);
// };

// export default useColumnDefs;





// import { useMemo } from "react";
// import { TProduct } from "@/types/product";
// import DataTable from "@/components/table/DataTable";
// import useColumnDefs from "./columnDefs";

// interface ProductTableProps {
//     products: TProduct[];
//     handleSelectedRows: (rows: any) => void;
//     isFetching: boolean;
// }

// const ProductTable: React.FC<ProductTableProps> = ({ products, handleSelectedRows, isFetching }) => {
//     const columnDefs = useColumnDefs();

//     return (
//         <DataTable
//             rowData={products}
//             columnDefs={columnDefs}
//             isFetching={isFetching}
//             handleSelectedRows={handleSelectedRows}
//         />
//     );
// };

// export default ProductTable;
