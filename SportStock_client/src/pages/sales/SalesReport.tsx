import { ColDef } from "@ag-grid-community/core";
import DataTable from "@/components/table/DataTable";
import { useGetSalesDataQuery } from "@/redux/features/sale/SaleApi";
import { TSale } from "@/types/sale.types";
import PdfSaleReport from "@/components/table/sales/PdfSaleReport";
import SearchInput from "@/components/table/SearchInput";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";

interface IRow {
    saleId: string;
    productName: string;
    buyerName: string;
    totalPrice: number;
    quantity: number;
    branch: string;
    saleDate: string;
}

const SalesReport = () => {
    const { data, isFetching } = useGetSalesDataQuery(undefined);

    const [params, setParams] = useState<string[]>([]);


    const salesData = data?.data?.map((sale: TSale) => {
        return {
            _id: sale._id,
            saleId: sale.saleId,

            productName: sale.productName,
            buyerName: sale.buyerName,
            branch: sale.branch,
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
            cellRenderer: (params) => new Date(params.value).toLocaleDateString(),
            maxWidth: 100,
        },
        { field: "quantity", maxWidth: 100 },
        { field: "totalPrice", maxWidth: 100 },
        {
            headerName: "Download",
            cellRenderer: PdfSaleReport,
            maxWidth: 100,
        },
    ];

    return (
        <div className="">
            {/* filter and search options .......... */}
            <div className="mb-2 flex justify-between  flex-wrap gap gap-2">
                <div className="flex gap-1">
                    <SearchInput params={params} setParams={setParams} />
                    {params.length > 0 && (
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
        </div>
    );
};

export default SalesReport;
