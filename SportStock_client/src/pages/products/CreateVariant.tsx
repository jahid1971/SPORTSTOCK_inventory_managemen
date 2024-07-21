import { useParams } from "react-router-dom";
import CreatreProduct from "./CreatreProduct";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { Spinner } from "@/components/ui/Spinner";

const CreateVariant = () => {
    const params = useParams();
    console.log(params, "params")

    const { data: productData } = useGetSingleProductQuery(params?.productId as string);
    return (
        <div>
            {!productData?.data ? (
                <Spinner label="Please wait" />
            ) : (
                <CreatreProduct dataForVariant={productData?.data} />
            )}
        </div>
    );
};

export default CreateVariant;
