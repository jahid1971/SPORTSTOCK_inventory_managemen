import DataTable from "@/components/table/DataTable";
import FilterByDate from "@/components/table/FilterByDate";
import FilterByInput from "@/components/table/FilterByInput";
import FilterByOptions from "@/components/table/FilterByOptions";

import { defaultParams } from "@/constants/global.constant";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import { useGetAdjustStockHistoryQuery } from "@/redux/api/stockApi";

import { TCategory } from "@/types/product";
import { IStockHistory } from "@/types/stock.types";
import { tableSerial } from "@/utls/utls";
import { ColDef } from "@ag-grid-community/core";
import { useState } from "react";

const AdjustHistory = () => {
    const [params, setParams] = useState<any[]>(defaultParams);

    const { data, isFetching: historyFetching } =
        useGetAdjustStockHistoryQuery(undefined);

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

    const historyData = data?.data?.data?.map((item, index) => ({
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
            headerName: "Sku",
            field: "productId.productCode",
            maxWidth: 100,
        },
        {
            headerName: "Branch Name",
            field: "branchId.branchName",
            maxWidth: 100,
        },
        {
            headerName: "Quantity",
            field: "quantityChanged",
            maxWidth: 100,
        },
        {
            headerName: "Adjusted By",
            field: "madeBy.fullName",
            maxWidth: 150,
        },
        {
            headerName: "Date",
            field: "date",
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

    return (
        <div>
            <DataTable
                title="ADJUSTED STOCK HISTORY"
                rowData={historyData}
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

export default AdjustHistory;
