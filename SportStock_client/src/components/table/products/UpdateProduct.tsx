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

export const UpdateProduct = (params: any) => {
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
        params.data.role !== "superAdmin" && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                        Update Product
                    </Button>
                </DialogTrigger>

                <DialogContent className="w-full">
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
        )
    );
};
