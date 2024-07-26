/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues } from "react-hook-form";
import tryCatch from "@/utls/tryCatch";

import { useUpdateSellerMutation } from "@/redux/api/userApi";

import SellerForm from "@/components/form/SellerForm";
import { TUser } from "@/types/global.types";
import { toast } from "sonner";

const UpdateSeller = ({ userData }: { userData: TUser }) => {
    const [updateSeller] = useUpdateSellerMutation();

    const onSubmit = async (data: FieldValues, formOptions: any) => {
        const dirtyFields = formOptions?.dirtyFields;

        if (Object.keys(dirtyFields).length === 0)
            return toast.error("No changes made to update");

        const changedData: Record<string, any> = {};

        for (const key of Object.keys(dirtyFields)) {
            changedData[key] = data[key];
        }

        const formData = new FormData();

        if (changedData?.userPhoto) {
            formData.append("file", changedData?.userPhoto);
            delete changedData?.userPhoto;
        }

        if (Object.keys(changedData).length > 0) {
            formData.append("data", JSON.stringify(changedData));
        }


        tryCatch(
            async () => {
                const res = await updateSeller({
                    data: formData,
                    id: userData?._id,
                });
                const updatedData = (res as any)?.data?.data;

                if (updatedData)
                    formOptions.reset({
                        ...updatedData,
                        branch: (updatedData as any)?.branch?._id,
                    });
                return res;
            },
            "Seller Updated",
            "Seller is Updating"
        );
    };
    return (
        <div className=" w-11/12 md:w-8/12 mx-auto flex  flex-col  justify-center  gap-5 mt-5 px-8 py-8 shadow-lg bg-white rounded-2xl">
            <h3 className="text-primary-400 text-2xl font-semibold">
                UPDATE SELLER
            </h3>
            <SellerForm
                isEditMode
                onSubmit={onSubmit}
                defaultValues={{
                    ...userData,
                    branch: (userData as any)?.branch?._id,
                }}
            />
        </div>
    );
};

export default UpdateSeller;
