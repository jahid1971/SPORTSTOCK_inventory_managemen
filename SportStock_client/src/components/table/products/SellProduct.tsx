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

export const SellProduct = (params: any) => {
    const { control, handleSubmit } = useForm<TProduct>({
        defaultValues: { branch: params.data.branch, price: params.data.price },
    });

    const [updateProduct] = useUpdateProductMutation();

    const onSubmit = (data: TProduct) => {
        // const updateData = { data: data, id: params.data._id };
        // tryCatch(
        //     async () => await updateProduct(updateData),
        //     "Product updated successfully",
        //     "Updating product"
        // );
        // console.log(updateData, "updateData")
        console.log("data", data);
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
                        <FloatingInput id="buyerName" label="Buyer Name" control={control} />
                        <DatePicker id="saleDate" label="Sale Date" control={control} />
                        <FloatingInput
                            id="quantity"
                            label="Product Quantity"
                            type="number"
                            control={control}
                            rules={{
                                required: "Quantity is required",
                                validate: (value: number) =>
                                    value <= params.data.quantity ||
                                    `Quantity cannot exceed available amount (${params.data.quantity})`,
                            }}
                        />

                        <FloatingInput disabled id="branch" label="Branch Name" control={control} />
                        <FloatingInput disabled id="price" label="Price" control={control} />
                    </div>
                    <Button type="submit">Sell Product</Button>

                    <DialogClose asChild className="mt-3 mr-auto">
                        ff
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>

    //     <Dialog>
    //     <DialogTrigger asChild>
    //         <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
    //             Sell Product
    //         </Button>
    //     </DialogTrigger>
    //     <DialogContent className="lg:min-w-fit py-2 ">
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <div className="bg-background p-4">
    //              hello
    //             </div>

    //             <DialogClose asChild className="mt-3 mr-auto">
          
    //                 <Button type="submit">Update</Button>
    //             </DialogClose>
    //         </form>
    //     </DialogContent>
    // </Dialog>
    );
};
