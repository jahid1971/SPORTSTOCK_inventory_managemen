import {  useState } from "react";

// import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef } from "@ag-grid-community/core";


import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";

import { DeleteButton } from "@/components/table/products/DeleteButton";
import { UpdateProduct } from "@/components/table/products/UpdateProduct";
import { Button } from "@/components/ui/button";

import { useGetAllBranchesQuery } from "@/redux/features/admin/adminApi";
import { TQueryParam } from "@/types/global.types";
import { RxCross2 } from "react-icons/rx";
import FilterByOptions from "@/components/table/FilterByOptions";
import FilterByInput from "@/components/table/FilterByInput";
import SearchInput from "@/components/table/SearchInput";
import { SellProduct } from "@/components/table/products/SellProduct";
import DataTable from "@/components/table/DataTable";


interface IRow {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    branch: string;
}

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isFetching } = useGetProductsQuery(params);

    const { data: branches, isLoading: isBranchesLoading } = useGetAllBranchesQuery(undefined);
    const branchOptions = branches?.data?.map((branch) => ({ label: branch.branchName, value: branch._id }));

    const products = data?.data?.map((product: TProduct) => {
        return {
            _id: product._id,
            // id: user.id,
            image: product.image,
            name: product.productName,
            price: product.price,
            quantity: product.quantity,
            branch: product.branch.branchName,
            productData: product,
        };
    });

    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "id", maxWidth: 80 },
        {
            field: "image",
            maxWidth: 80,
            cellRenderer: (params) => {
                return params?.data?.image ? (
                    <img src={params?.data?.image} alt="product" className="size-10 rounded-full" />
                ) : undefined;
            },
        },
        {
            headerName: "Product Name",
            field: "name",
        },
        { field: "price", maxWidth: 100 },
        { field: "quantity", maxWidth: 100 },
        { field: "branch" },
        {
            headerName: "Update",
            cellRenderer: UpdateProduct,
        },
        {
            headerName: "Sell",
            cellRenderer: SellProduct,
        },
        {
            headerName: "Delete",
            cellRenderer: DeleteButton,
        },
    ]);

    // const defaultColDef: ColDef = {
    //     flex: 1,
    // };

    // useEffect(() => {
    //     if (isFetching) gridRef.current?.api?.showLoadingOverlay();
    //     else if (!isFetching && !products?.length) gridRef.current!.api?.showNoRowsOverlay();
    //     else gridRef.current?.api?.hideOverlay();
    // }, [isFetching, products?.length]);

    return (
        <div className="ag-theme-quartz ">
            {/* filter and search options .......... */}

            <div className="mb-2 flex justify-between  flex-wrap gap gap-2">
                <div className="flex gap-1">
                    <SearchInput params={params} setParams={setParams} />
                    {params.length > 0 && (
                        <Button className="text-primary pr-6 text-base" variant={"outline"} onClick={() => setParams([])}>
                             <RxCross2 className="size-5 mr-1 pt-0.5 " /> Reset
                        </Button>
                    )}
                </div>

                <div className="flex gap-1">
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
                </div>
            </div>

            {/* table..............table */}

            <DataTable rowData={products} columnDefs={colDefs} isFetching={isFetching} />
        </div>
    );
};

export default Products;
