import { FieldValues } from "react-hook-form";
import tryCatch from "@/utls/tryCatch";
import { useUpdateBranchManagerMutation } from "@/redux/api/userApi";
import SellerForm from "@/components/form/SellerForm";
import { TUser } from "@/types/global.types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateBranchManager = ({ userData }: { userData: TUser }) => {
    const navigate = useNavigate();
    const [updateBranchManager] = useUpdateBranchManagerMutation();

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
                const res = await updateBranchManager({
                    data: formData,
                    id: userData?._id,
                });
                const updatedData = (res as any)?.data?.data;

                if (updatedData) {
                    formOptions.reset({
                        ...updatedData,
                        branch: (updatedData as any)?.branch?._id,
                    });
                    navigate("/users");
                }
                return res;
            },
            "Branch Manager Updated",
            "Branch Manager is Updating"
        );
    };
    return (
        <div className=" w-11/12 md:w-8/12 mx-auto flex  flex-col  justify-center  gap-5 mt-5 px-8 py-8 shadow-lg bg-white rounded-2xl">
            <h3 className="text-primary-400 text-2xl font-semibold">
                UPDATE BRANCH MANAGER
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

export default UpdateBranchManager;
