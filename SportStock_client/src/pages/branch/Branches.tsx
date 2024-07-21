import UpdateBranchStatus from "@/components/table/branches/UpdateStatus";

import DataTable from "@/components/table/DataTable";
import DeleteButton from "@/components/table/DeleteButton";
import FilterByOptions from "@/components/table/FilterByOptions";
import { Button } from "@/components/ui/button";
import {
    useDeleteBranchMutation,
    useGetAllBranchesQuery,
} from "@/redux/api/adminApi";
import { TQueryParam } from "@/types/global.types";
import tryCatch from "@/utls/tryCatch";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Branches = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isFetching } = useGetAllBranchesQuery(params);
    const branches = data?.data?.data;

    const [deleteBranch] = useDeleteBranchMutation();

    const handleDelete = (id: string) => {
        tryCatch(
            async () => deleteBranch({ data: { isDeleted: true }, id: id }),
            "Branch deleted successfully",
            "Deleting Branch"
        );
    };

    const colDefs = [
        {
            field: "branchName",
            headerName: "Branch Name",
            sortable: true,
        },
        {
            field: "location",
            headerName: "Location",
            sortable: true,
        },
        {
            headerName: "status",
            cellRenderer: UpdateBranchStatus,
        },
        {
            headerName: "Action",
            cellStyle: { display: "flex", alignItems: "center" },
            cellRenderer: (params: any) => (
                <DeleteButton
                    button={
                        <button>
                            <Trash2 className="text-red-500" />
                        </button>
                    }
                    handleDelete={() => handleDelete(params?.data?._id)}
                />
            ),
        },
    ];
    

    const createButton = (
        <NavLink to="/add-branch">
            <Button size={"xsm"}>Create Branch</Button>
        </NavLink>
    );

    const filters = (
        <div>
            <FilterByOptions
                filterBy="status"
                filterItems={[
                    { label: "Inactive", value: "inactive" },
                    { label: "Active", value: "active" },
                ]}
                params={params}
                setParams={setParams}
                title="Status"
            />
        </div>
    );
    return (
        <div>
            <DataTable
                rowData={branches}
                columnDefs={colDefs}
                isFetching={isFetching}
                searchField={false}
                // handleSelectedRows={handleSelectedRows}
                params={params}
                setParams={setParams}
                filterable={true}
                filters={filters}
                createButton={createButton}
            />
        </div>
    );
};

export default Branches;
