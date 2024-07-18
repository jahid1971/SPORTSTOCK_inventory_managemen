import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllStocksQuery } from "@/redux/features/stock/stockApi";
import { IStock } from "@/types/stock.types";
import { dateFormatter } from "@/utls/utls";
import { ColDef, ICellRendererParams } from "@ag-grid-community/core";
import { EllipsisVertical, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StockList = () => {
    const [params, setParams] = useState<any[]>([]);
    const navigate = useNavigate();

    const { data, isFetching: stockFetching } = useGetAllStocksQuery(params);
    const stocksData = data?.data?.data;

    console.log(stocksData, "stocksData");

    const columnDefs: ColDef<IStock | any>[] = [
        // {
        //     headerName: "Image",
        //     field: "productId.image",
        //     cellRenderer: (params: any) => {
        //         return params?.value ? (
        //             <img
        //                 src={params?.value}
        //                 alt="product"
        //                 className="size-12 my-2"

        //             />
        //         ) : undefined;
        //     },
        //     maxWidth: 80,
        //     autoHeight: true,
        // },
        {
            headerName: "Product Name",
            field: "productId.productName",
        },
        {
            headerName: "Category",
            field: "productId.category.category",
            maxWidth: 150,
        },
        {
            headerName: "Branch Name",
            field: "branchId.branchName",
            maxWidth: 150,
        },

        {
            headerName: "Price",
            field: "productId.price",
            maxWidth: 100,
        },
        {
            headerName: "Available Stock Quantity",
            field: "quantity",
            maxWidth: 300,
            cellRenderer: (params) => (
                <div className="text-xl font-semibold text-slate-700 pl-20">
                    {params?.data?.quantity}{" "}
                    <span className="text-sm font-normal">pcs</span>
                </div>
            ),
        },
        {
            headerName: "Action",
            cellStyle: { display: "flex", alignItems: "center" },
            cellRenderer: (params: ICellRendererParams) => (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="cursor-pointer" size={15} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() =>
                                navigate(`/add-stock`, {
                                    state: { params: params?.data },
                                })
                            }
                        >
                            <Button
                                className=" p-1 font-normal w-full"
                                variant="base"
                                size={"xsm"}
                            >
                                <PlusIcon className="mr-2" />
                                Add Stock
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button
                                className=" p-1 font-normal w-full"
                                variant="outline_primary"
                                size={"xsm"}
                                onClick={() => {
                                    navigate(`/adjust-stock`, {
                                        state: { params: params?.data },
                                    });
                                }}
                            >
                                <MinusIcon className="mr-2" />
                                Adjust Stock
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button
                                className=" p-1 font-normal w-full"
                                
                                size={"xsm"}
                                onClick={() => {
                                    navigate(`/stock-transfer`, {
                                        state: { params: params?.data },
                                    });
                                }}
                            >
                                <MinusIcon className="mr-2" />
                                Transfer Stock
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
        // {
        //     headerName: "Date",
        //     field: "createdAt",
        //     valueFormatter: (params) => dateFormatter(params?.value),
        //     maxWidth: 150,
        // },
    ];

    return (
        <div>
            {" "}
            <DataTable
                rowData={stocksData}
                columnDefs={columnDefs}
                isFetching={stockFetching}
                // handleSelectedRows={handleSelectedRows}
                params={params}
                setParams={setParams}
                filterable={true}
                // filters={filters}
                // createButton={createButton}
            />
        </div>
    );
};

export default StockList;
