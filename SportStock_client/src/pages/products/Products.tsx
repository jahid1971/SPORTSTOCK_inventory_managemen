/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState, useCallback } from "react";
import {
    useGetAllBrandNamesQuery,
    useGetAllCategoriesQuery,
    useGetProductsQuery,
} from "@/redux/api/productApi";
import { TBrand, TCategory, TProduct } from "@/types/product";

import { Button } from "@/components/ui/button";

import { TQueryParam, TUserRole } from "@/types/global.types";
import FilterByOptions from "@/components/table/FilterByOptions";
import FilterByInput from "@/components/table/FilterByInput";
import DataTable from "@/components/table/DataTable";

import { userRole } from "@/constants/user";
import { useCurrentUser } from "@/redux/Hooks";
import { ICellRendererParams } from "@ag-grid-community/core";
import DeleteButton from "@/components/table/products/DeleteButton";
import { NavLink, useNavigate } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { defaultParams } from "@/constants/global.constant";

interface IRow extends TProduct {
    _id: string;
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>(defaultParams);

    const [deletIds, setDeleteIds] = useState<string[]>([]);

    const user = useCurrentUser();
    const role: any = user?.role;
    const selectedRowsRef = useRef<IRow[]>([]);
    const navigate = useNavigate();

    const { data, isFetching }: any = useGetProductsQuery(params);

    const { data: category, isFetching: isCategoryFetching }: any =
        useGetAllCategoriesQuery(undefined);
    const { data: brands, isFetching: isBrandFetching }: any =
        useGetAllBrandNamesQuery(undefined);

    const categoryOptions = category?.data?.map((category: TCategory) => ({
        label: category.category,
        value: category._id,
    }));

    const brandOptions = brands?.data?.map((brand: TBrand) => ({
        label: brand.brandName,
        value: brand._id,
    }));

    const products = data?.data?.map((product: any) => {
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

    const [allColumnDefs] = useState([
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            maxWidth: 50,
        },
        {
            headerName: "Product Name",
            field: "name",
            minWidth: 150,
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
                        className="size-9 "
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
            maxWidth: 100,
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
                                    navigate(
                                        "/update-product/" + params?.data?._id
                                    )
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
                                <Button
                                    className=" p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                    onClick={() =>
                                        setTimeout(() => {
                                            setDeleteIds([
                                                params?.data?._id ?? "",
                                            ]);
                                        }, 100)
                                    }
                                >
                                    <Trash2 className="mr-2" size={15} />
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
        },
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

    const handleSelectedRows = useCallback((rows: any) => {
        selectedRowsRef.current = rows;
    }, []);

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
        <Button
            size={"xsm"}
            onClick={() =>
                setDeleteIds(
                    selectedRowsRef.current.map((row: IRow) => row._id)
                )
            }
        >
            DELETE
        </Button>
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
                minWidth={1000}
            />
            <DeleteButton deleteids={deletIds} setDeleteIds={setDeleteIds} />
        </div>
    );
};

export default Products;
