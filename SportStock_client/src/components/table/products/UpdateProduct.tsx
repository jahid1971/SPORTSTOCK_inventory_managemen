/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { useUpdateProductMutation } from "@/redux/api/productApi";
import { TProduct } from "@/types/product";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { Pencil } from "lucide-react";
import { CustomDilog } from "@/components/ui/CustomDialog";
import { useState } from "react";

export const UpdateProduct = ({
    productToUpdate,
    setProductToUpdate,
}: {
    productToUpdate: TProduct | null;
    setProductToUpdate: React.Dispatch<React.SetStateAction<TProduct | null>>;
}) => {

    console.log(productToUpdate, "productToUpdate");
    const { control, handleSubmit } = useForm<TProduct>({
        defaultValues: { ...productToUpdate },
    });

    const [updateProduct] = useUpdateProductMutation();

    const handleUpdtateProduct = (data: TProduct) => {
        const updateData = { data: data, id: productToUpdate?._id };
        tryCatch(
            async () => await updateProduct(updateData),
            "Product updated successfully",
            "Updating product",
            () => setProductToUpdate(null)
        );
        // console.log(updateData, "updateData")
    };

    return (
        // <Dialog>
        //     <DialogTrigger asChild>
        //         <Button
        //             className=" p-1 font-normal w-full"
        //             variant="outline_primary"
        //             size={"xsm"}
        //         >
        //             <Pencil className="mr-2" />
        //             Update
        //         </Button>
        //     </DialogTrigger>

        //     <DialogContent className="lg:min-w-fit py-2">
        //         <form onSubmit={handleSubmit(handleUpdtateProduct)}>
        //             <div className="bg-background p-4">
        //                 <ProductInfo control={control} />
        //                 <ProductStock control={control} />
        //             </div>

        //             <DialogClose asChild className="mt-3 mr-auto">
        //                 <Button type="submit">Update</Button>
        //             </DialogClose>
        //         </form>
        //     </DialogContent>
        // </Dialog>
        <>
            <CustomDilog
                isOpen={!!productToUpdate}
                setIsOpen={() => setProductToUpdate(null)}
            >
                <form onSubmit={handleSubmit(handleUpdtateProduct)}>
                    <div className="bg-background p-4">
                        <ProductInfo control={control} />{" "}
                        <ProductStock control={control} />
                    </div>

                    <Button type="submit">Update</Button>
                </form>
            </CustomDilog>
        </>
    );
};
