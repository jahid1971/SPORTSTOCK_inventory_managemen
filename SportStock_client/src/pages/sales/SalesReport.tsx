/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColDef } from "@ag-grid-community/core";
import DataTable from "@/components/table/DataTable";
import { useGetSalesDataQuery } from "@/redux/features/sale/SaleApi";
import { TSale } from "@/types/sale.types";
import SearchInput from "@/components/table/SearchInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { MyPagination } from "@/components/others/Pagination";
import DownLoadSaleReport from "@/components/table/sales/PrintSaleReport";

interface IRow {
    saleId: string;
    productName: string;
    buyerName: string;
    totalPrice: number;
    quantity: number;
    branch: {
        _id: string;
        branchName: string;
    };
    saleDate: string;
}

const SalesReport = () => {
    const [params, setParams] = useState<{ name: string; value: any }[]>([]);

    const { data, isFetching } = useGetSalesDataQuery([
        ...params,
        { name: "sortBy", value: "saleDate" },
        { name: "sortOrder", value: "desc" },
    ]);

    const salesData = data?.data?.data?.map((sale: TSale) => {
        return {
            _id: sale._id,
            saleId: sale.saleId,

            productName: sale.productName,
            buyerName: sale.buyerName,
            branch: sale?.branch?.branchName,
            saleDate: sale.saleDate,
            quantity: sale.quantity,
            totalPrice: sale.totalPrice,

            saleData: sale,
        };
    });

    const colDefs: ColDef<IRow>[] = [
        { field: "saleId" },

        {
            headerName: "Product Name",
            field: "productName",
        },
        { field: "buyerName" },

        { field: "branch" },
        {
            field: "saleDate",
            cellRenderer: (params: any) => new Date(params.value).toLocaleDateString(),
            maxWidth: 100,
        },
        { field: "quantity", maxWidth: 100 },
        { field: "totalPrice", maxWidth: 100 },
        {
            headerName: "Download",
            cellRenderer: DownLoadSaleReport,
            maxWidth: 100,
        },
    ];

    return (
        <div className="">
            {/* filter and search options .......... */}
            <div className="mb-2 flex justify-between  flex-wrap gap gap-2">
                <div className="flex gap-1">
                    <SearchInput params={params} setParams={setParams} />
                    {params.filter((param) => param.name !== "page").length > 0 && (
                        <Button
                            className="text-primary pr-6 text-base"
                            variant={"outline"}
                            onClick={() => setParams([])}>
                            <RxCross2 className="size-5 mr-1 pt-0.5 " /> Reset
                        </Button>
                    )}
                </div>

                {/* <div className="flex gap-1">
                    {!isBranchesLoading && (
                        <FilterByOptions
                            title="Branches"
                            filterBy="branch"
                            params={params}
                            setParams={setParams}
                            filterItems={branchOptions}
                        />
                    )}
                    <FilterByInput filterBy="Price" title="Price" params={params} setParams={setParams} />
                    <FilterByInput
                        filterBy="Quantity"
                        title="Quantity"
                        params={params}
                        setParams={setParams}
                    />
                </div> */}
            </div>
            {/* table..............table */}
            <DataTable rowData={salesData} columnDefs={colDefs} isFetching={isFetching} />
            <div className="flex justify-between items-center">
                <h3 className="text-base font-medium text-primary-400">
                    Total Sales: {data?.data?.meta?.total}
                </h3>
                {data?.data?.meta?.totalPages > 1 && (
                    <MyPagination metaData={data?.data?.meta} params={params} setParams={setParams} />
                )}
            </div>
        </div>
    );
};

export default SalesReport;
