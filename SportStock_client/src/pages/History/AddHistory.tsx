import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { useGetStockHistoryQuery } from "@/redux/features/stock/stockApi";
import { IStockHistory } from "@/types/stock.types";
import { ColDef } from "@ag-grid-community/core";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AddStockHistory = () => {
    const [params, setParams] = useState<any[]>([]);

    const { data, isFetching: historyFetching } =
        useGetStockHistoryQuery(params);

    const historyData = data?.data?.data;

    console.log("historyData", historyData);

    const columnDefs: ColDef<IStockHistory | any>[] = [
        {
            headerName: "Product Name",
            field: "productId.productName",
        },
        {
            headerName: "Product Code",
            field: "productId.productCode",
            maxWidth: 150,
        },
        {
            headerName: "Branch Name",
            field: "branchId.branchName",
            maxWidth: 150,
        },
        {
            headerName: "Quantity",
            field: "stockId.quantity",
            maxWidth: 100,
        },
        {
            headerName: "Added By",
            field: "madeBy.fullName",
            maxWidth: 150,
        },
        {
            headerName: "Date",
            field: "createdAt",
            valueFormatter: (params) =>
                new Date(params?.value).toLocaleDateString(),
            maxWidth: 150,
        },
    ];

    const addButton = (
        <NavLink to="/add-stock">
            <Button size={"xsm"}>
                {" "}
                <PlusIcon size={15} className="mr-2" />
                Add Stock
            </Button>
        </NavLink>
    );

    return (
        <div>
            <DataTable
                createButton={addButton}
                title="ADDED STOCK HISTORY"
                rowData={historyData}
                columnDefs={columnDefs}
                isFetching={historyFetching}
                params={params}
                setParams={setParams}
                filterable={true}
                metaData={data?.data?.meta}
            />
        </div>
    );
};

export default AddStockHistory;
