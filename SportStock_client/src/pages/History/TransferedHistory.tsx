import DataTable from "@/components/table/DataTable";
import FilterByDate from "@/components/table/FilterByDate";
import FilterByInput from "@/components/table/FilterByInput";
import FilterByOptions from "@/components/table/FilterByOptions";
import { Button } from "@/components/ui/button";

import { defaultParams } from "@/constants/global.constant";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import {
    useGetAdjustStockHistoryQuery,
    useGetTransferStockHistoryQuery,
} from "@/redux/api/stockApi";

import { TCategory } from "@/types/product";
import { IStockHistory } from "@/types/stock.types";
import { tableSerial } from "@/utls/utls";
import { ColDef } from "@ag-grid-community/core";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const TransferedHistory = () => {
    const [params, setParams] = useState<any[]>(defaultParams);

    const { data, isFetching: historyFetching } =
        useGetTransferStockHistoryQuery(undefined);

    const { data: branchData } = useGetAllBranchesQuery(undefined);

    const branchOptions = branchData?.data?.data.map((branch) => ({
        value: branch._id,
        label: branch.branchName,
    }));

    const { data: categoriesData } = useGetAllCategoriesQuery(undefined);

    const categoryOptions = categoriesData?.data?.map(
        (category: TCategory) => ({
            value: category._id,
            label: category.category,
        })
    );

    const transferData = data?.data?.data?.map((item, index) => ({
        ...item,
        sl: tableSerial(params, index),
    }));

    const columnDefs: ColDef<IStockHistory | any>[] = [
        {
            headerName: "Product Name",
            field: "productId.productName",
        },
        {
            headerName: "Category",
            field: "categoryId.category",
            maxWidth: 150,
        },

        {
            headerName: "From Branch",
            field: "branchId.branchName",
            maxWidth: 150,
        },
        {
            headerName: "To Branch",
            field: "transferToStock.branchName",
            maxWidth: 150,
        },
        {
            headerName: "Quantity",
            field: "quantityChanged",
            maxWidth: 100,
        },
        {
            headerName: "By",
            field: "madeBy.fullName",
            maxWidth: 100,
        },
        {
            headerName: "Date",
            field: "createdAt",
            valueFormatter: (params) =>
                new Date(params?.value).toLocaleDateString(),
            maxWidth: 100,
        },
    ];

    const filters = [
        <FilterByOptions
            filterBy="branchId"
            filterItems={branchOptions}
            params={params}
            setParams={setParams}
            title="Branches"
        />,

        <FilterByOptions
            filterBy="categoryId"
            filterItems={categoryOptions}
            params={params}
            setParams={setParams}
            title="Categories"
        />,

        <FilterByInput
            filterBy="quantityChanged"
            params={params}
            setParams={setParams}
            title="Quantity"
        />,

        <FilterByDate
            filterBy="date"
            params={params}
            setParams={setParams}
            title="Date"
        />,
    ];

    const transferButton = (
        <NavLink to="/stock-transfer">
            <Button size={"xsm"}>
                {" "}
                <PlusIcon size={15} className="mr-2" />
                Transfer Stock
            </Button>
        </NavLink>
    );

    console.log("transferData", transferData);
    return (
        <div>
            <DataTable
                title="TRANSFER STOCK HISTORY"
                createButton={transferButton}
                rowData={transferData}
                columnDefs={columnDefs}
                isFetching={historyFetching}
                params={params}
                setParams={setParams}
                filterable={true}
                metaData={data?.data?.meta}
                filters={filters}
            />
        </div>
    );
};

export default TransferedHistory;
