import ProductInfo from "@/components/form/ProductInfo";
import ProductStock from "@/components/form/ProductStock";
import { Text } from "@/components/ui/Text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    CAccordion,
    CustomAccordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";
import tryCatch from "@/utls/tryCatch";
import { useForm } from "react-hook-form";

const CreatreProduct = () => {
    const { handleSubmit, control } = useForm();
    const [creatreProduct] = useCreateProductMutation();

    const onSubmit = (data: TProduct) => {
        tryCatch(async () => await creatreProduct(data), "Product Created Successfully", "Creating Product");
    };
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center  p-2">
                <h5 className="text-lg font-semibold ">Create New Product</h5>
                <Button variant={"base"} size={"xsm"}>
                    Back to Product
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-background p-4">
                    <CustomAccordion
                        accordionTrigger={" Product Information"}
                        triggerClassName="border-b border-b-primary w-full pb-1 text-lg">
                        <ProductInfo control={control} />
                    </CustomAccordion>
                    <CustomAccordion
                        className="mt-8"
                        accordionTrigger={" Product Stocking"}
                        triggerClassName="border-b border-b-primary w-full pb-1 text-lg">
                        <ProductStock control={control} />
                    </CustomAccordion>
                </div>
                <div className="flex justify-end mt-3">
                    <Button>Save Product</Button>
                </div>
            </form>
        </div>
    );
};

export default CreatreProduct;
