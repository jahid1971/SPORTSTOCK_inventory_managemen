/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { CustomAccordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { TProduct } from "@/types/product";
import tryCatch from "@/utls/tryCatch";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const CreatreProduct = ({ dataForVariant }: { dataForVariant?: TProduct }) => {
    const { control, handleSubmit } = useForm<TProduct>({
        defaultValues: { ...dataForVariant },
    });
    const [creatreProduct] = useCreateProductMutation();
    const navigate = useNavigate();

    const onSubmit = (data: TProduct) => {
        delete data?._id;
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));
        formData.append("file", data?.image);
        tryCatch(
            async () => {
                const res = await creatreProduct(formData);
                if ((res as any)?.data?.success) navigate("/products");
                return res;
            },
            "Product Created Successfully",
            "Creating Product"
        );

        console.log(Object.fromEntries(formData.entries()), "formData");
    };
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center  p-2">
                <h5 className="text-lg font-semibold text-primary ">
                    {!dataForVariant
                        ? "Create New Product"
                        : "Create New Variant"}
                </h5>
                <Link to="/products">
                    <Button  size={"xsm"}>
                        Back to Product
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" p-4">
                    <CustomAccordion
                        accordionTrigger={"Stock Information*"}
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
                    {!dataForVariant ? (
                        <Button>Create Product</Button>
                    ) : (
                        <Button type="submit">Create Variant</Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreatreProduct;
