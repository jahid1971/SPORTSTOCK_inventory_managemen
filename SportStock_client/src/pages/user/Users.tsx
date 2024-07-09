import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { UpdateButton } from "@/components/table/products/UpdateButton";
// import { UserDeleteButton } from "@/components/table/users/UserDeleteButton";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import DataTable from "@/components/table/DataTable";
import { TUser } from "@/types/global.types";
import { UserDeleteButton } from "@/components/table/users/UserDeleteButton";
import { UpdateButton } from "@/components/table/products/UpdateButton";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
    id: string;
    fullName: string;
    role: number;
    status: boolean;
}

const Users = () => {
    const { data, isFetching } = useGetAllUsersQuery(undefined);

    const allUsers = data?.data?.map((user:TUser) => {
        return {
            _id: user._id,
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            status: user.status,
        };
    });

    const colDefs:ColDef<IRow>[]=[
        { field: "id" },
        { field: "fullName" },
        { field: "role" },
        { field: "status" },
        {
            headerName: "Update Status",
            cellRenderer: UpdateButton,
        },
        {
            headerName: "Delete",
            cellRenderer: UserDeleteButton,
        },
    ];
    
    return (
        <div className="ag-theme-quartz ">
            <DataTable rowData={allUsers} columnDefs={colDefs} isFetching={isFetching} />
        </div>
    );
};

export default Users;
