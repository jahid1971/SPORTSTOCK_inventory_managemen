import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    useGetSingleProductQuery,
    useUpdateProductMutation,
} from "@/redux/api/productApi";
import { TProduct } from "@/types/product";
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { Button } from "@/components/ui/button";
import tryCatch from "@/utls/tryCatch";

import { CustomAccordion } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation();
    const { productId } = useParams();
    const { data, isLoading } = useGetSingleProductQuery({ id: productId });

    const {
        control,
        handleSubmit,
        formState: { dirtyFields },
        reset,
    } = useForm<TProduct>();

    useEffect(() => {
        if (!isLoading && data?.data) {
            reset(data.data);
        }
    }, [data, reset, isLoading]);

    const onSubmit = async (data: TProduct) => {
        if (Object.keys(dirtyFields).length === 0)
            return toast.error("No changes made to update");

        const changedData: Record<string, any> = {};

        for (const key of Object.keys(dirtyFields) as (keyof TProduct)[]) {
            changedData[key] = data[key];
        }

        const formData = new FormData();

        if (changedData?.image) {
            formData.append("file", changedData?.image);
            delete changedData?.image;
        }

        if (Object.keys(changedData).length > 0) {
            formData.append("data", JSON.stringify(changedData));
        }

        tryCatch(
            async () => await updateProduct({ data: formData, id: productId }),
            "Product updated successfully",
            "Updating product",
            () => navigate("/products")
        );
    };

    if (!data?.data) return <Spinner label="Please wait" />;

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center  p-2">
                <h5 className="text-lg font-semibold text-primary ">
                    UPDATE PRODUCT
                </h5>
                <Link to="/products">
                    <Button size={"xsm"}>Back to Products</Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" p-4">
                    <CustomAccordion
                        accordionTrigger={"Stock Information"}
                        triggerClassName="border-b border-b-primary w-full pb-1 text-lg"
                    >
                        <ProductStock control={control} />
                    </CustomAccordion>
                    <CustomAccordion
                        className="mt-8"
                        accordionTrigger={"Other Information"}
                        triggerClassName="border-b border-b-primary w-full pb-1 text-lg"
                    >
                        <ProductInfo control={control} />
                    </CustomAccordion>
                </div>
                <div className="flex justify-end mt-3">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
