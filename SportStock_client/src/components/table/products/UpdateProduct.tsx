/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { useUpdateProductMutation } from "@/redux/api/productApi";
import { TProduct } from "@/types/product";

import { CustomDilog } from "@/components/ui/CustomDialog";
import React from "react";

export const UpdateProduct = ({
    productToUpdate,
    setProductToUpdate,
}: {
    productToUpdate: TProduct | null;
    setProductToUpdate: React.Dispatch<React.SetStateAction<TProduct | null>>;
}) => {
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
