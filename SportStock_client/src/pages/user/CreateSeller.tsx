/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from "react-hook-form";
import tryCatch from "@/utls/tryCatch";

import { useCreateSellerMutation } from "@/redux/api/userApi";

import SellerForm from "@/components/form/SellerForm";

const CreateSeller = () => {
    const [createSeller] = useCreateSellerMutation();

    const onSubmit = async (data: FieldValues, reset: () => void) => {
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));
        formData.append("file", data?.userPhoto);
        tryCatch(
            async () => {
                const res = await createSeller(formData);
                if ((res as any)?.data?.success) reset();
                return res;
            },
            "Seller Created",
            "Seller is Creating"
        );
    };
    return (
        <div className=" w-11/12 md:w-8/12 mx-auto flex  flex-col  justify-center  gap-5 mt-5 px-8 py-8 shadow-lg bg-white rounded-2xl">
            <h3 className="text-primary-400 text-2xl font-semibold">
                CREATE SELLER
            </h3>
            <SellerForm onSubmit={onSubmit} />
        </div>
    );
};

export default CreateSeller;
