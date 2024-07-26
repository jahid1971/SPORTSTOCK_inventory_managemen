import CreateBranch from "@/components/product/CreateBranch";
import { Button } from "@/components/ui/button";
import { CustomCombobox } from "@/components/ui/CustomCombobox";
import CustomInput from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { userRole } from "@/constants/user";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
    useAddStockMutation,
    useGetAllStocksQuery,
} from "@/redux/api/stockApi";
import { useCurrentUser } from "@/redux/Hooks";
import { TBranch } from "@/types/global.types";
import tryCatch from "@/utls/tryCatch";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { PiPlusCircleBold } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

const AddStock = () => {
    const user = useCurrentUser();
    const { state } = useLocation();

    const { control, handleSubmit, watch, reset, formState } = useForm({
        defaultValues: {
            branchId: state?.params?.branchId?._id,
            productId: state?.params?.productId?._id,
        },
    });

    useEffect(() => {
        if (state?.params) {
            reset({
                branchId: state.params.branchId?._id,
                productId: state.params.productId?._id,
            });
        }
    }, [state, reset]);

    const { data: branchNames, isFetching: isBranchNameFetching } =
        useGetAllBranchesQuery(undefined);

    const branchNamesOptions = branchNames?.data?.data?.map(
        (branch: TBranch) => ({
            value: branch._id,
            label: branch.branchName,
        })
    );

    const selectedBranchId = watch("branchId");
    const inputQuantity = watch("quantity");
    const productId = watch("productId");

    const { data: product } = useGetProductsQuery(undefined);

    const productOptions = product?.data?.map((product: any) => ({
        value: product._id,
        label: product.productName,
    }));

    const [addStock] = useAddStockMutation();

    const {
        data,
        isSuccess,
        isFetching: isStockFetching,
    } = useGetAllStocksQuery(
        [
            { name: "branchId", value: selectedBranchId },
            { name: "productId", value: productId },
        ],
        { skip: !selectedBranchId || !productId }
    );
    const stockedProduct = data?.data?.data[0];

    const totalStock = useMemo(
        () => stockedProduct?.quantity + Number(inputQuantity),
        [inputQuantity, stockedProduct]
    );

    const onSubmit = (data: any) => {
        const payload = {
            reason: "added",
            madeBy: user?._id,
            ...data,
        };

        tryCatch(
            async () => await addStock(payload),
            "Stock Added Successfully",
            "Adding Stock",
            () => {
                const prevValues = watch();
                reset({ ...prevValues, quantity: null });
            }
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between my-5">
                <h5 className="text-lg font-semibold text-primary ">
                    ADD STOCK
                </h5>
                <NavLink to="/stock-list">
                    <Button size={"xsm"}>Back To Stock List</Button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
                    {" "}
                    <DatePicker
                        id="updatedAt"
                        label="Date"
                        control={control}
                        rules={{
                            required: "Date is required",
                            validate: (value: Date) => {
                                const currentDate = new Date();
                                if (value > currentDate)
                                    return "Sale Date can not be future";
                            },
                        }}
                        defaultValue={new Date()}
                    />
                    <div className="w-full">
                        {(user?.role === userRole.ADMIN ||
                            user?.role === userRole.SUPER_ADMIN) && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                                        <PiPlusCircleBold />
                                        Add New
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <CreateBranch isModalTrue />
                                </DialogContent>
                            </Dialog>
                        )}

                        <CustomSelect
                            id="branchId"
                            label="Branch Name"
                            control={control}
                            options={branchNamesOptions}
                            disabled={
                                isBranchNameFetching ||
                                user?.role === userRole.BRANCH_MANAGER
                            }
                            required
                            defaultValue={
                                user?.role === userRole.BRANCH_MANAGER
                                    ? user?.branch
                                    : ""
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 my-5 mt-10">
                    <div className="w-full md:col-span-2">
                        <div className="bg-primary text-white text-center py-2">
                            Item
                        </div>
                        <div className="p-3">
                            <CustomCombobox
                                id="productId"
                                control={control}
                                label="Search Item"
                                options={productOptions}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-primary text-white text-center py-2">
                            Qunatity
                        </div>
                        <div className="p-3">
                            <CustomInput
                                control={control}
                                id={"quantity"}
                                type="number"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-primary text-white text-center py-2">
                            Avilable Stock
                        </div>
                        <div className="p-3 text-center font-semibold text-xl">
                            {isStockFetching
                                ? "Loading..."
                                : isSuccess && (stockedProduct?.quantity || 0)}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-primary text-white text-center py-2">
                            Total Stock
                        </div>
                        <div className="p-3 text-center font-semibold text-xl">
                            {isStockFetching
                                ? "Loading..."
                                : isSuccess &&
                                  (stockedProduct?.quantity || 0) +
                                      (Number(inputQuantity) || 0)}
                        </div>
                    </div>
                </div>

                <Button>
                    <PlusIcon size={15} className="mr-1" />
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddStock;
