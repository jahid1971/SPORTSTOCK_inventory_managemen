import { useState } from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useGetUsersQuery } from "@/redux/features/shared/sharedApi";
import { updateButton } from "@/components/table/UpdateButton";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
    id: string;
    fullName: string;
    role: number;
    status: boolean;
}

const Users = () => {
    const { data } = useGetUsersQuery(undefined);

    const allUsers = data?.data?.map((user) => {
        return {
            _id: user._id,
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            status: user.status,
        };
    });

    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "id" },
        { field: "fullName" },
        { field: "role" },
        { field: "status" },
        {
            headerName: "Action",
            cellRenderer: updateButton,
        },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    return (
        <div className="ag-theme-quartz ">
            {allUsers && (
                <AgGridReact
                    rowData={allUsers}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                />
            )}
        </div>
    );
};

export default Users;
