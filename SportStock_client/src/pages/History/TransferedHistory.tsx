import DataTable from "@/components/table/DataTable";
import FilterByDate from "@/components/table/FilterByDate";
import FilterByInput from "@/components/table/FilterByInput";
import FilterByOptions from "@/components/table/FilterByOptions";
import { Button } from "@/components/ui/button";

import { defaultParams } from "@/constants/global.constant";
import { userRole } from "@/constants/user";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import { useGetTransferStockHistoryQuery } from "@/redux/api/stockApi";
import { useCurrentUser } from "@/redux/Hooks";

import { TCategory } from "@/types/product";
import { IStockHistory } from "@/types/stock.types";
import { tableSerial, updateParam } from "@/utls/utls";
import { ColDef } from "@ag-grid-community/core";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { RiFilterLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const TransferedHistory = () => {
    const user = useCurrentUser();
    const [params, setParams] = useState<any[]>(defaultParams);

    const { data, isFetching: historyFetching }:any =
        useGetTransferStockHistoryQuery(params);

    const { data: categoriesData }:any = useGetAllCategoriesQuery(undefined);

    const categoryOptions = categoriesData?.data?.map(
        (category: TCategory) => ({
            value: category._id,
            label: category.category,
        })
    );

    const transferData = data?.data?.data?.map((item: any, index: number) => ({
        ...item,
        sl: tableSerial(params, index),
    }));

    const columnDefs: ColDef<IStockHistory | any>[] = [
        {
            headerName: "Product Name",
            field: "productName",
        },
        {
            headerName: "Category",
            field: "categoryName",
            maxWidth: user?.role !== userRole.BRANCH_MANAGER ? 120 : 150,
        },

        {
            headerName: "From Branch",
            field: "branchName",
            maxWidth: 120,
        },
        {
            headerName: "To Branch",
            field: "transferToStockName",
            maxWidth: 120,
        },
        {
            headerName: "Quantity",
            field: "quantityChanged",
            maxWidth: 100,
        },
        {
            headerName: "By",
            field: "madeByName",
            maxWidth: 150,
        },
        {
            headerName: "Date",
            field: "date",
            valueFormatter: (params) =>
                new Date(params?.value).toLocaleDateString(),
            maxWidth: user?.role !== userRole.BRANCH_MANAGER ? 100 : 150,
        },
    ];

    const filters = [
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
        </Button>,

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

    const transferButton = (
        <NavLink to="/stock-transfer">
            <Button size={"xsm"}>
                {" "}
                <PlusIcon size={15} className="mr-2" />
                Transfer Stock
            </Button>
        </NavLink>
    );

  
    return (
        <div>
            <DataTable
                searchField
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
