import DataTable from "@/components/table/DataTable";
import { useGetAllBranchesQuery } from "@/redux/features/admin/adminApi";

const Branches = () => {
    const { data,isFetching } = useGetAllBranchesQuery(undefined);
    const branches = data?.data;
    console.log("branches", branches);

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
    ];
    return (
        <div>
        
            <DataTable
                rowData={branches}
                columnDefs={colDefs}
                isFetching={isFetching}
                searchField={false}
                // handleSelectedRows={handleSelectedRows}
                // params={params}
                // setParams={setParams}
                // filterable={true}
                // filters={filters}
                // createButton={createButton}
            />
        </div>
    );
};

export default Branches;
