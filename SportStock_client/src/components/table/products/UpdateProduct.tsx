/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";
import { CustomCellRendererProps } from "@ag-grid-community/react";

export const UpdateProduct = ({ params }: { params: CustomCellRendererProps }) => {
    const { control, handleSubmit } = useForm<TProduct>({
        defaultValues: { ...params?.data?.productData },
    });

    const [updateProduct] = useUpdateProductMutation();

    const handleUpdtateProduct = (data: TProduct) => {
        const updateData = { data: data, id: params.data._id };
        tryCatch(
            async () => await updateProduct(updateData),
            "Product updated successfully",
            "Updating product"
        );
        // console.log(updateData, "updateData")
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                    Update
                </Button>
            </DialogTrigger>

            <DialogContent className="lg:min-w-fit py-2">
                <form onSubmit={handleSubmit(handleUpdtateProduct)}>
                    <div className="bg-background p-4">
                        <ProductInfo control={control} />
                        <ProductStock control={control} />
                    </div>

                    <DialogClose asChild className="mt-3 mr-auto">
                        <Button type="submit">Update</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
};
