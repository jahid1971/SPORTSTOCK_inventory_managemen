import Custom_Form from "@/components/form/Custom_Form";
import CreateBranch from "@/components/product/CreateBranch";
import { Button } from "@/components/ui/button";
import { CustomCombobox } from "@/components/ui/CustomCombobox";
import CustomInput from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import {
    useAddStockMutation,
    useAdjustStockMutation,
    useGetAllStocksQuery,
    useTransferStockMutation,
} from "@/redux/api/stockApi";
import { useCurrentUser } from "@/redux/Hooks";
import { TBranch } from "@/types/global.types";
import tryCatch from "@/utls/tryCatch";
import { DialogClose } from "@radix-ui/react-dialog";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PiPlusCircleBold } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

const StockTransfer = () => {
    const user = useCurrentUser();
    const { state } = useLocation();

    const { control, handleSubmit, watch, reset, setError } = useForm({
        // mode: "onBlur",
        defaultValues: {
            fromBranch: state?.params?.branchId?._id,
            productId: state?.params?.productId?._id,
        },
    });

    useEffect(() => {
        if (state?.params) {
            reset({
                fromBranch: state.params.branchId?._id,
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

    const selectedFromBranch = watch("fromBranch");
    const selectedToBranch = watch("toBranch");

    const inputQuantity = watch("quantity");
    const productId = watch("productId");

    const { data: product, isFetching } = useGetProductsQuery(undefined);

    const productOptions = product?.data?.map((product: any) => ({
        value: product._id,
        label: product.productName,
    }));

    const [transferStock] = useTransferStockMutation();

    const {
        data: fromBranch,
        isSuccess: fromSuccess,
        isFetching: isFromBranchFetching,
    } = useGetAllStocksQuery(
        [
            { name: "branchId", value: selectedFromBranch },
            { name: "productId", value: productId },
        ],
        { skip: !selectedFromBranch || !productId }
    );
    const fromBranchData = fromBranch?.data?.data[0];

    const {
        data: toBranch,
        isSuccess,
        isFetching: isToBranchFetching,
    } = useGetAllStocksQuery(
        [
            { name: "branchId", value: selectedToBranch },
            { name: "productId", value: productId },
        ],
        { skip: !selectedToBranch || !productId }
    );
    const toBranchData = toBranch?.data?.data[0];

    const onSubmit = (data: any) => {
        const payload = {
            madeBy: user?.id,
            reason: "transferred",
            ...data,
        };

        tryCatch(
            async () => await transferStock(payload),
            "Stock transferred successfully",
            "Transfering Stock",
            () => {
                const prevValues = watch();
                reset({ ...prevValues, quantity: null });
            }
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-primary my-5">
                    TRANSFER STOCK
                </h5>
                <NavLink to="/stock-list">
                    <Button size={"xsm"}>Back To Stock List</Button>
                </NavLink>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
                    {" "}
                    <div className="md:col-span-2 md:w-6/12">
                        <DatePicker
                            id="updatedAt"
                            label="Date"
                            control={control}
                            rules={{
                                required: "Date is required",
                            }}
                            defaultValue={new Date()}
                        />
                    </div>
                    <CustomSelect
                        id="fromBranch"
                        label="From Branch"
                        control={control}
                        options={branchNamesOptions}
                        disabled={isBranchNameFetching}
                        required
                    />
                    <div className="w-full">
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

                        <CustomSelect
                            id="toBranch"
                            label="To Branch"
                            control={control}
                            options={branchNamesOptions?.filter(
                                (branch) => branch.value !== selectedFromBranch
                            )}
                            disabled={
                                isBranchNameFetching || !selectedFromBranch
                            }
                            required
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
                                rules={{
                                    validate: (value: number) => {
                                        console.log(
                                            value,
                                            fromBranchData?.quantity
                                        );
                                        if (value > fromBranchData?.quantity)
                                            return "Quantity can not be greater than available stock";
                                    },
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-primary text-white text-center py-2">
                            From Branch Stock
                        </div>
                        <div className="p-3 text-center font-semibold text-xl">
                            {isFromBranchFetching
                                ? "Loading..."
                                : fromSuccess &&
                                  (fromBranchData?.quantity -
                                      Number(inputQuantity) ||
                                      0)}
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-primary text-white text-center py-2">
                            To Branch Stock
                        </div>
                        <div className="p-3 text-center font-semibold text-xl">
                            {isToBranchFetching
                                ? "Loading..."
                                : isSuccess &&
                                  (toBranchData?.quantity || 0) +
                                      (Number(inputQuantity) || 0)}
                        </div>
                    </div>
                </div>

                <Button>Transfer</Button>
            </form>
        </div>
    );
};

export default StockTransfer;
