/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import tryCatch from "@/utls/tryCatch";
import { TProduct } from "@/types/product";
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { DatePicker } from "@/components/ui/DatePicker";
import { useCreateSaleMutation } from "@/redux/features/sale/SaleApi";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { useState } from "react";

type TSaleData = TProduct & {
    confirmation?: boolean;
};
export const SellProduct = (params: CustomCellRendererProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createSale] = useCreateSaleMutation();
    const { control, handleSubmit, watch, formState } = useForm<TSaleData>({
        mode: "onBlur",
        defaultValues: { branch: params.data.branch, price: params.data.price },
    });

    const quantity = watch("quantity");
    const total = quantity * params.data.price;
    const isConfirmed = watch("confirmation");
    const { isValid } = formState;

    const onSubmit = (data: TSaleData) => {
        if (!data.confirmation || !isValid) return;
        delete data.confirmation;

        data.branch = {
            _id: params.data.productData.branch._id,
            branchName: params.data.productData.branch.branchName,
        };

        const saleData = {
            ...data,
            productId: params.data._id,
            productName: params.data.name,
        };
        console.log("data", saleData);
        tryCatch(
            async () => {
                const res = await createSale(saleData).unwrap();
                setIsModalOpen(false);
                return res;
            },
            "Product sold successfully",
            "Sale Product is in progress"
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-primary/10 p-1 font-normal"
                    variant="outline"
                    size={"xsm"}
                >
                    Sell Product
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full p-5 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="text-center text-lg pb-2">
                        {params?.data?.name}
                    </h4>
                    <div className="bg-background  flex flex-col gap-2">
                        <FloatingInput
                            id="buyerName"
                            label="Buyer Name"
                            required
                            control={control}
                        />
                        <DatePicker
                            id="saleDate"
                            label="Sale Date"
                            control={control}
                            rules={{
                                required: "Date is required",
                                validate: (value: Date) => {
                                    const currentDate = new Date();
                                    if (value > currentDate)
                                        return "Sale Date can not be future";
                                },
                            }}
                        />
                        <FloatingInput
                            id="quantity"
                            label="Product Quantity"
                            type="number"
                            control={control}
                            rules={{
                                required: "Quantity is required",
                                validate: (value: number) =>
                                    value <= params.data.quantity ||
                                    `Quantity cannot exceed available Product - ${params.data.quantity}`,
                            }}
                        />
                        <FloatingInput
                            disabled
                            id="price"
                            label="Price"
                            control={control}
                        />
                        <FloatingInput
                            disabled
                            id="branch"
                            label="Branch Name"
                            control={control}
                        />
                        {total > 0 && (
                            <div className="text-lg text-primary ">
                                <input
                                    className="size-4 mr-2 "
                                    type="checkbox"
                                    {...control.register("confirmation")}
                                />
                                <label htmlFor="confirmation">
                                    Total {total} tk has been paid
                                </label>
                            </div>
                        )}
                    </div>

                    <Button
                        disabled={!isConfirmed}
                        className="mt-2"
                        type="submit"
                    >
                        Sell Product
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
