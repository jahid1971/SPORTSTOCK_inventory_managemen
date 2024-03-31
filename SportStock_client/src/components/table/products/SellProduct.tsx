import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import CustomSelect from "../../ui/CustomSelect";
import { useUpdateUserStatusMutation } from "@/redux/features/shared/sharedApi";
import tryCatch from "@/utls/tryCatch";
import { statusOptions } from "@/constants/user";
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { DatePicker } from "@/components/ui/DatePicker";
import { useCreateSaleMutation } from "@/redux/features/sale/SaleApi";

type TSaleData = TProduct & {
    confirmation?: boolean;
};
export const SellProduct = (params: any) => {
    const [createSale] = useCreateSaleMutation();
    const { control, handleSubmit, watch } = useForm<TSaleData>({
        defaultValues: { branch: params.data.branch, price: params.data.price },
    });

    const quantity = watch("quantity");
    const total = quantity * params.data.price;
    const isConfirmed = watch("confirmation");

    const onSubmit = (data: TSaleData) => {
        delete data.confirmation;
        const saleData = {
            ...data,
            productId: params.data._id,
            productName: params.data.name,
        };
        // console.log("data", saleData);
        tryCatch(async () => await createSale(saleData), "Product sold successfully", "Sale Product in progress");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                    Sell Product
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full p-5 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="text-center text-lg pb-2">{params?.data?.name}</h4>
                    <div className="bg-background  flex flex-col gap-2">
                        <FloatingInput id="buyerName" label="Buyer Name" required control={control} />
                        <DatePicker
                            rules={{ required: "Sale Date is required" }}
                            id="saleDate"
                            label="Sale Date"
                            control={control}
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
                        <FloatingInput disabled id="price" label="Price" control={control} />
                        <FloatingInput disabled id="branch" label="Branch Name" control={control} />
                        {total > 0 && (
                            <div className="text-lg text-primary ">
                                <input
                                    className="size-4 mr-2 "
                                    type="checkbox"
                                    {...control.register("confirmation")}
                                />
                                <label htmlFor="confirmation">Total {total} tk has been paid</label>
                            </div>
                        )}
                    </div>
            

                    <DialogClose asChild className="mt-3 mr-auto">
                    <Button disabled={!isConfirmed} className="mt-2" type="submit">
                        Sell Product
                    </Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};
