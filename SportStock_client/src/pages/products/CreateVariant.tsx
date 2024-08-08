import { useParams } from "react-router-dom";
import CreatreProduct from "./CreatreProduct";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { Spinner } from "@/components/ui/Spinner";
import { TProduct } from "@/types/product";

const CreateVariant = () => {
    const params = useParams();

    const { data: productData } = useGetSingleProductQuery(
        (params as any)?.productId
    );
    return (
        <div>
            {!productData?.data ? (
                <Spinner label="Please wait" />
            ) : (
                <CreatreProduct
                    dataForVariant={productData?.data as TProduct}
                />
            )}
        </div>
    );
};

export default CreateVariant;
