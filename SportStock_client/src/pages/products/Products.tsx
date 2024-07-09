/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import {
    useGetAllBrandNamesQuery,
    useGetAllSportTypesQuery,
    useGetProductsQuery,
    useMultiProductDeleteMutation,
} from "@/redux/features/product/productApi";
import { TBrand, TProduct, TSportType } from "@/types/product";

import { UpdateProduct } from "@/components/table/products/UpdateProduct";
import { Button } from "@/components/ui/button";

import { useGetAllBranchesQuery } from "@/redux/features/admin/adminApi";
import { TBranch, TQueryParam, TUserRole } from "@/types/global.types";
import { RxCross2 } from "react-icons/rx";
import FilterByOptions from "@/components/table/FilterByOptions";
import FilterByInput from "@/components/table/FilterByInput";
import SearchInput from "@/components/table/SearchInput";
import { SellProduct } from "@/components/table/products/SellProduct";
import DataTable from "@/components/table/DataTable";

// import { productSizeOptions } from "@/constants/product";
import tryCatch from "@/utls/tryCatch";
import { toast } from "sonner";
import { userRole } from "@/constants/user";
import { useCurrentUser } from "@/redux/Hooks";
import { ICellRendererParams } from "@ag-grid-community/core";
// import DeleteModal from "@/components/Modals/DeleteModal";
import DeleteButton from "@/components/table/products/DeleteButton";
import { NavLink } from "react-router-dom";

interface IRow {
    _id: string;
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    branch: string;
}

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const user = useCurrentUser();
    const role: any = user?.role;
    const selectedRowsRef = useRef<IRow[]>([]);

    const { data, isFetching } = useGetProductsQuery(params);
    const [multiDelete] = useMultiProductDeleteMutation();

    const { data: branches, isLoading: isBranchesLoading } = useGetAllBranchesQuery(undefined);
    const { data: sportsTypes, isFetching: isSportsTypeFetching } = useGetAllSportTypesQuery(undefined);
    const { data: brands, isFetching: isBrandFetching } = useGetAllBrandNamesQuery(undefined);

    const branchOptions = branches?.data?.map((branch: TBranch) => ({
        label: branch.branchName,
        value: branch._id,
    }));
    const sportTypeOptions = sportsTypes?.data?.map((sportType: TSportType) => ({
        label: sportType.sportType,
        value: sportType._id,
    }));

    const brandOptions = brands?.data?.map((brand: TBrand) => ({
        label: brand.brandName,
        value: brand._id,
    }));
    // const sizeOptions = productSizeOptions.filter((size) => size.label !== "Not Applicable");

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

    const [allColumnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 50,
        },
        {
            headerName: "Product Name",
            field: "name",
        },
        {
            field: "image",
            maxWidth: role !== userRole.SELLER ? 80 : undefined,
            cellRenderer: (params: any) => {
                return params?.data?.image ? (
                    <img src={params?.data?.image} alt="product" className="size-10 rounded-full" />
                ) : undefined;
            },
        },

        { field: "price", maxWidth: role !== userRole.SELLER ? 100 : undefined },
        { field: "quantity", maxWidth: role !== userRole.SELLER ? 100 : undefined },
        { field: "branch" },
        {
            headerName: "Update",
            cellRenderer: (params: ICellRendererParams<IRow>) =>
                user?.role !== userRole.SELLER && <UpdateProduct params={params} />,
        },
        {
            headerName: "Sell",
            cellRenderer: SellProduct,
        },
        {
            headerName: "Create variant",
            cellRenderer: (params: ICellRendererParams<IRow>) => (
                <NavLink to={`/create-variant/${params?.data?._id}`}>
                    <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                        Create Variant
                    </Button>
                </NavLink>
            ),
        },
        // {
        //     headerName: "Delete",
        //     cellRenderer: (params: ICellRendererParams<IRow>) =>
        //         user?.role !== userRole.SELLER && <DeleteButton params={params} />,
        // },
    ]);

    const getColumnDefsForRole = (role: TUserRole) => {
        if (role === userRole.SELLER) {
            return allColumnDefs.filter(
                (col) =>
                    col.field !== "branch" && col.headerName !== "Update" && col.checkboxSelection !== true
            );
        } else return allColumnDefs;
    };

    const columnDefs = useMemo(() => getColumnDefsForRole(role), [role]);

    const handleSelectedRows = (rows: any) => {
        selectedRowsRef.current = rows; // Update the ref
        console.log(selectedRowsRef.current, "selectedRows");
    };

    const handleDeleteTrigger = () => {
        if (selectedRowsRef.current.length === 0) return toast.error("Please select products to delete");
        setModalOpen(true);
    };

    const handleMultiDelete = () => {
        const selectedIds = selectedRowsRef.current.map((item) => item?._id);
        console.log(selectedIds, selectedRowsRef.current, "selectedIds");
        tryCatch(async () => await multiDelete(selectedIds), "Products Deleted", "Deleting Products");
    };

    return (
        <div className="">
            {/* filter and search options .......... */}
            <div className="mb-2 flex justify-between  flex-wrap gap gap-2">
                <div className="flex gap-1">
                    <SearchInput params={params} setParams={setParams} />
                </div>

                {/* filter options................. */}
                <div className="flex gap-1 flex-wrap">
                    {!isBranchesLoading && (
                        <FilterByOptions
                            title="Branches"
                            filterBy="branch"
                            params={params}
                            setParams={setParams}
                            filterItems={branchOptions}
                        />
                    )}
                    {!isSportsTypeFetching && (
                        <FilterByOptions
                            title="Sprts Types"
                            filterBy="sportType"
                            params={params}
                            setParams={setParams}
                            filterItems={sportTypeOptions}
                        />
                    )}

                    {!isBrandFetching && (
                        <FilterByOptions
                            title="Brands"
                            filterBy="brand"
                            params={params}
                            setParams={setParams}
                            filterItems={brandOptions}
                        />
                    )}
                    {/* <FilterByOptions
                        title="Size"
                        filterBy="size"
                        params={params}
                        setParams={setParams}
                        filterItems={sizeOptions}
                    /> */}
                    <FilterByOptions
                        title="Condition"
                        filterBy="condition"
                        params={params}
                        setParams={setParams}
                        filterItems={[
                            { label: "New", value: "new" },
                            { label: "Used", value: "used" },
                        ]}
                    />
                    <FilterByInput filterBy="Price" title="Price" params={params} setParams={setParams} />
                    <FilterByInput
                        filterBy="Quantity"
                        title="Quantity"
                        params={params}
                        setParams={setParams}
                    />
                </div>
            </div>

            <div className="">
                {params.length > 0 && (
                    <Button
                        className="text-primary border border-primary pr-6 px-10 text-base h-9 mb-2 "
                        variant={"outline"}
                        onClick={() => setParams([])}>
                        <RxCross2 className="size-5 mr-1 pt-0.5 " /> Reset
                    </Button>
                )}
            </div>

            {/* table..............table */}

            <DataTable
                rowData={products}
                columnDefs={columnDefs}
                isFetching={isFetching}
                handleSelectedRows={handleSelectedRows}
            />

            <DeleteButton
                handleTrigger={handleDeleteTrigger}
                setOpen={setModalOpen}
                open={modalOpen}
                handleMultiDelete={handleMultiDelete}
            />
        </div>
    );
};

export default Products;
