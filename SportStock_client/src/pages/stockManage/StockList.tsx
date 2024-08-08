import DataTable from "@/components/table/DataTable";
import FilterByInput from "@/components/table/FilterByInput";
import FilterByOptions from "@/components/table/FilterByOptions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import { defaultParams } from "@/constants/global.constant";
import { useGetAllStocksQuery } from "@/redux/api/stockApi";
import { IStock } from "@/types/stock.types";

import { ColDef, ICellRendererParams } from "@ag-grid-community/core";
import { EllipsisVertical, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/redux/Hooks";
import { userRole } from "@/constants/user";
import { TCategory } from "@/types/product";
import { TBranch } from "@/types/global.types";

const StockList = () => {
    const user = useCurrentUser();
    const [params, setParams] = useState<any[]>(defaultParams);
    const navigate = useNavigate();

    const { data, isFetching: stockFetching }:any = useGetAllStocksQuery(params);
    const stocksData = data?.data?.data;

    const { data: branchData }:any = useGetAllBranchesQuery(undefined);
    const branchOptions = branchData?.data?.data.map((branch: TBranch) => ({
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

    const columnDefs: ColDef<IStock | any>[] = [
        {
            headerName: "Product Name",
            field: "productName",
        },
        {
            headerName: "Category",
            field: "category",
            maxWidth: 150,
        },
        {
            headerName: "Branch Name",
            field: "branchName",
            maxWidth: 150,
        },
        {
            headerName: "Price",
            field: "price",
            maxWidth: 100,
        },
        {
            headerName: "Stock Quantity",
            field: "quantity",
            maxWidth: 300,
            cellRenderer: (params: any) => (
                <div className="text-xl font-semibold text-slate-700 ">
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
                        <EllipsisVertical
                            className="cursor-pointer"
                            size={15}
                        />
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
    ];

    const filteredColumnDefs = columnDefs.filter((column) => {
        if (
            (user?.role === userRole.BRANCH_MANAGER ||
                user?.role === userRole.SELLER) &&
            column.field === "branchId.branchName"
        ) {
            return false;
        }

        if (user?.role === userRole.SELLER && column.field === "action")
            return false;
        return true;
    });

    const filters = [
        user?.role !== userRole.BRANCH_MANAGER &&
            user?.role !== userRole.SELLER && (
                <FilterByOptions
                    filterBy="branchId"
                    filterItems={branchOptions}
                    params={params}
                    setParams={setParams}
                    title="Branches"
                />
            ),

        <FilterByOptions
            filterBy="categoryId"
            filterItems={categoryOptions}
            params={params}
            setParams={setParams}
            title="Categories"
        />,
        <FilterByInput
            filterBy="quantity"
            params={params}
            setParams={setParams}
            title="Quantity"
        />,
        <FilterByInput
            filterBy="price"
            params={params}
            setParams={setParams}
            title="Price"
        />,
    ];

    const createButton =
        user?.role === userRole.SELLER ? (
            <Button size={"xsm"} onClick={() => navigate(`/adjust-stock`)}>
                Adjust Stock
            </Button>
        ) : (
            <Button size={"xsm"} onClick={() => navigate(`/add-stock`)}>
                Add Stock
            </Button>
        );

    return (
        <div>
            <DataTable
                title="STOCKS"
                createButton={createButton}
                rowData={stocksData}
                columnDefs={filteredColumnDefs}
                isFetching={stockFetching}
                params={params}
                setParams={setParams}
                filterable={true}
                filters={filters}
                searchField={true}
                metaData={data?.data?.meta}
            />
        </div>
    );
};

export default StockList;
