import DataTable from "@/components/table/DataTable";
import FilterByDate from "@/components/table/FilterByDate";
import FilterByInput from "@/components/table/FilterByInput";
import FilterByOptions from "@/components/table/FilterByOptions";
import { Button } from "@/components/ui/button";
import { defaultParams } from "@/constants/global.constant";
import { userRole } from "@/constants/user";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import { useGetAdjustStockHistoryQuery } from "@/redux/api/stockApi";

import { useCurrentUser } from "@/redux/Hooks";
import { TBranch } from "@/types/global.types";

import { TCategory } from "@/types/product";
import { IStockHistory } from "@/types/stock.types";
import { tableSerial, updateParam } from "@/utls/utls";
import { ColDef } from "@ag-grid-community/core";
import { useState } from "react";
import { RiFilterLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdjustHistory = () => {
    const user = useCurrentUser();
    const navigate = useNavigate();
    const [params, setParams] = useState<any[]>(defaultParams);

    const { data, isFetching: historyFetching }:any =
        useGetAdjustStockHistoryQuery(params);

    const { data: branchData }:any = useGetAllBranchesQuery(undefined);

    const branchOptions = branchData?.data?.data.map((branch:TBranch) => ({
        value: branch._id,
        label: branch.branchName,
    }));

    const { data: categoriesData }:any = useGetAllCategoriesQuery(undefined);

    const categoryOptions = categoriesData?.data?.map(
        (category: TCategory) => ({
            value: category._id,
            label: category.category,
        })
    );

    const historyData = data?.data?.data?.map(
        (item: IStockHistory, index: number) => ({
            ...item,
            sl: tableSerial(params, index),
        })
    );

    const columnDefs: ColDef<IStockHistory | any>[] = [
        {
            headerName: "Product Name",
            field: "productName",
            minWidth: 150,
        },
        {
            headerName: "Category",
            field: "categoryName",
            maxWidth: 150,
        },
        {
            headerName: "Sku",
            field: "productCode",
            maxWidth: 100,
        },
        {
            headerName: "Branch",
            field: "branchName",
            maxWidth: 100,
        },
        {
            headerName: "Quantity",
            field: "quantityChanged",
            maxWidth: 90,
        },
        {
            headerName: "Adjusted By",
            field: "madeByName",
            maxWidth: 150,
        },
        {
            headerName: "Date",
            field: "date",
            valueFormatter: (params) =>
                new Date(params?.value).toLocaleDateString(),
            // maxWidth: 100,
        },
    ];

    const filterdColumnDef = columnDefs.filter((col) => {
        if (
            (user?.role === userRole.BRANCH_MANAGER ||
                user?.role === userRole.SELLER) &&
            col.field === "branchId.branchName"
        ) {
            return false;
        }
        return true;
    });

    const filters = [
        user?.role === userRole.ADMIN &&
            user?.role === userRole.SUPER_ADMIN && (
                <FilterByOptions
                    filterBy="branchId"
                    filterItems={branchOptions}
                    params={params}
                    setParams={setParams}
                    title="Branches"
                />
            ),

        user?.role !== userRole.BRANCH_MANAGER && (
            <Button
                onClick={() =>
                    setParams((prev) => updateParam(prev, "madeBy", user?._id))
                }
                size={"xsm"}
                variant={
                    params?.find((item: any) => item.name === "madeBy")
                        ? "default"
                        : "outline_primary"
                }
            >
                <RiFilterLine className=" mr-1" />
                By Me
            </Button>
        ),

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

        <FilterByDate params={params} setParams={setParams} title="Date" />,
    ];

    const createButton = (
        <Button size={"xsm"} onClick={() => navigate("/adjust-stock")}>
            Adjust Stock
        </Button>
    );

    return (
        <div>
            <DataTable
                title="ADJUSTED STOCK HISTORY"
                createButton={createButton}
                searchField
                rowData={historyData}
                columnDefs={filterdColumnDef}
                isFetching={historyFetching}
                params={params}
                setParams={setParams}
                filterable={true}
                metaData={data?.data?.meta}
                filters={filters}
                minWidth={800}
            />
        </div>
    );
};

export default AdjustHistory;
