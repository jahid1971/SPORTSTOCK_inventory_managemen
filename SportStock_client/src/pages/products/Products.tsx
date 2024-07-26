/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import {
    useGetAllBrandNamesQuery,
    useGetAllCategoriesQuery,
    useGetProductsQuery,
    useMultiProductDeleteMutation,
} from "@/redux/api/productApi";
import { TBrand, TProduct, TCategory } from "@/types/product";

import { UpdateProduct } from "@/components/table/products/UpdateProduct";
import { Button } from "@/components/ui/button";

import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { TBranch, TQueryParam, TUserRole } from "@/types/global.types";
import { RxCross2 } from "react-icons/rx";
import FilterByOptions from "@/components/table/FilterByOptions";
import FilterByInput from "@/components/table/FilterByInput";
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
import { PiPlusBold } from "react-icons/pi";
import { EllipsisVertical, Pencil } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultParams } from "@/constants/global.constant";

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
    const [params, setParams] = useState<TQueryParam[]>(defaultParams);
    const [modalOpen, setModalOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState<IRow | null>(null);

    const user = useCurrentUser();
    const role: any = user?.role;
    const selectedRowsRef = useRef<IRow[]>([]);

    const { data, isFetching } = useGetProductsQuery(params);

    console.log(data, "products data");
    const [multiDelete] = useMultiProductDeleteMutation();

    const { data: category, isFetching: isCategoryFetching } =
        useGetAllCategoriesQuery(undefined);
    const { data: brands, isFetching: isBrandFetching } =
        useGetAllBrandNamesQuery(undefined);

    const categoryOptions = category?.data?.map((category: TCategory) => ({
        label: category.category,
        value: category._id,
    }));

    const brandOptions = brands?.data?.map((brand: TBrand) => ({
        label: brand.brandName,
        value: brand._id,
    }));
    // const sizeOptions = productSizeOptions.filter((size) => size.label !== "Not Applicable");

    console.log(data, "products --------------------");

    const products = data?.data?.map((product: TProduct) => {
        return {
            _id: product._id,
            // id: user.id,
            image: product.image,
            name: product.productName,
            price: product.price,
            quantity: product.quantity,
            productData: product,
            category: product?.category?.category,
            brand: product?.brand?.brandName,
        };
    });

    const handleDelete = (id: string) => {
        let selectedIds: string[] = [];
        if (id) {
            selectedIds = [id];
        } else {
            selectedIds = selectedRowsRef.current.map((row: IRow) => row._id);
        }
        tryCatch(
            async () => await multiDelete(selectedIds),
            "Products Deleted",
            "Deleting Products"
        );
    };

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
            maxWidth:
                role !== userRole.SELLER && role !== userRole.BRANCH_MANAGER
                    ? 80
                    : undefined,
            cellRenderer: (params: any) => {
                return params?.data?.image ? (
                    <img
                        src={params?.data?.image}
                        alt="product"
                        className="size-10 "
                    />
                ) : undefined;
            },
        },

        {
            field: "category",
            headerName: "Category",
            maxWidth: 150,
        },
        {
            field: "brand",
            headerName: "Brand",
            maxWidth: 150,
        },
        {
            field: "price",
            maxWidth:
                role !== userRole.SELLER && role !== userRole.BRANCH_MANAGER
                    ? 100
                    : undefined,
        },

        {
            headerName: "Create variant",
            cellRenderer: (params: ICellRendererParams<IRow>) => (
                <NavLink to={`/create-variant/${params?.data?._id}`}>
                    <Button
                        className="bg-primary/10 p-1 font-normal"
                        variant="outline"
                        size={"xsm"}
                    >
                        Create Variant
                    </Button>
                </NavLink>
            ),
        },
        {
            headerName: "Action",
            cellStyle: { display: "flex", alignItems: "center" },
            cellRenderer: (params: ICellRendererParams<IRow>) =>
                user?.role !== userRole.SELLER && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() =>
                                    setTimeout(() => {
                                        setProductToUpdate(params?.data);
                                    }, 100)
                                }
                            >
                                <Button
                                    className=" p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                >
                                    <Pencil className="mr-2" />
                                    Update
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DeleteButton
                                    classNames="w-full"
                                    handleTrigger={() => setModalOpen(true)}
                                    setOpen={setModalOpen}
                                    open={modalOpen}
                                    handleDelete={() =>
                                        handleDelete(params?.data?._id)
                                    }
                                    variant={"outline_primary"}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
        },
        // {
        //     headerName: "Delete",
        //     cellRenderer: (params: ICellRendererParams<IRow>) =>
        //         user?.role !== userRole.SELLER && <DeleteButton params={params} />,
        // },
    ]);

    const getColumnDefsForRole = (role: TUserRole) => {
        if (role === userRole.SELLER || role === userRole.BRANCH_MANAGER) {
            return allColumnDefs.filter(
                (col) =>
                    col.field !== "branch" &&
                    col.headerName !== "Update" &&
                    col.checkboxSelection !== true &&
                    col.headerName !== "Action" &&
                    col.headerName !== "Create variant"
            );
        } else return allColumnDefs;
    };

    const columnDefs = useMemo(() => getColumnDefsForRole(role), [role]);

    const handleSelectedRows = (rows: any) => {
        selectedRowsRef.current = rows; // Update the ref
        console.log(selectedRowsRef.current, "selectedRows");
    };

    const handleDeleteTrigger = () => {
        if (selectedRowsRef.current.length === 0)
            return toast.error("Please select products to delete");
        setModalOpen(true);
    };

    const createButton = (
        <NavLink to="/create-product">
            <Button size={"xsm"}>
                <PiPlusBold className="mr-1" /> Add Product
            </Button>
        </NavLink>
    );

    const filters = (
        <div className="flex gap-1 flex-wrap">
            {!isCategoryFetching && (
                <FilterByOptions
                    title="Sprts Types"
                    filterBy="category"
                    params={params}
                    setParams={setParams}
                    filterItems={categoryOptions}
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

            <FilterByInput
                filterBy="Price"
                title="Price"
                params={params}
                setParams={setParams}
            />
        </div>
    );

    const checkedRowsActionBtn = (
        <DeleteButton
            handleTrigger={handleDeleteTrigger}
            setOpen={setModalOpen}
            open={modalOpen}
            handleMultiDelete={handleDelete}
        />
    );

    return (
        <div className="">
            {/* table..............table */}

            <DataTable
                title="PRODUCTS"
                searchField
                rowData={products}
                columnDefs={columnDefs}
                isFetching={isFetching}
                handleSelectedRows={handleSelectedRows}
                params={params}
                setParams={setParams}
                filterable={true}
                filters={filters}
                createButton={
                    role !== userRole.SELLER &&
                    role !== userRole.BRANCH_MANAGER &&
                    createButton
                }
                checkedRowsActionBtn={checkedRowsActionBtn}
            />
            <UpdateProduct
                productToUpdate={productToUpdate}
                setProductToUpdate={setProductToUpdate}
            />
        </div>
    );
};

export default Products;
