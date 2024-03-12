import ProductInfo from "@/components/form/ProductInfo";
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

const CreatreProduct = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center  p-2">
                <h5 className="text-lg font-semibold ">Create New Product</h5>
                <Button variant={"base"} size={"xsm"}>
                    {" "}
                    Back to Product
                </Button>
            </div>
            <div className="bg-background p-4">
                <CustomAccordion
                    accordionTrigger={" Product Information"}
                    triggerClassName="border-b border-b-slate-400 w-full pb-1 text-lg">
                    <ProductInfo />
                </CustomAccordion>
            </div>
        </div>
    );
};

export default CreatreProduct;
