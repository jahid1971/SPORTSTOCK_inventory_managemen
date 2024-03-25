import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";

import { loadingOverlayComponent } from "@/components/table/tableLoader/LoadingOverlay";
import { noRowsOverlayComponent } from "@/components/table/tableLoader/NoRowsOverlay";
import { DeleteButton } from "@/components/table/products/DeleteButton";
import { UpdateProduct } from "@/components/table/products/UpdateProduct";
import { Button } from "@/components/ui/button";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    branch: string;
}

const Products = () => {
    const gridRef = useRef<AgGridReact>(null);
    const { data, isFetching } = useGetProductsQuery(undefined);

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
            headerName: "Delete",
            cellRenderer: DeleteButton,
        },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    useEffect(() => {
        if (isFetching) gridRef.current?.api?.showLoadingOverlay();
        else if (!isFetching && !products?.length) gridRef.current!.api?.showNoRowsOverlay();
        else gridRef.current?.api?.hideOverlay();
    }, [isFetching, products?.length]);

    return (
        <div className="ag-theme-quartz ">
            <div>
                Filter by:{" "}
                <Button variant={"outline"} size={""}>
                    Brand
                </Button>
            </div>
            <AgGridReact
                ref={gridRef}
                rowData={products}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                loadingOverlayComponent={loadingOverlayComponent}
                noRowsOverlayComponent={noRowsOverlayComponent}
            />
        </div>
    );
};

export default Products;
