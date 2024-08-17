/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import tryCatch from "@/utls/tryCatch";
import { useCreateBranchManagerMutation } from "@/redux/api/userApi";
import BranchManagerForm from "@/components/form/BranchManagerForm";
import { useNavigate } from "react-router-dom";

const CreateBranchManager = () => {
    const [createBranchManager] = useCreateBranchManagerMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        if (data?.userPhoto) {
            formData.append("file", data?.userPhoto);
            delete data.userPhoto;
        }

        formData.append("data", JSON.stringify(data));

        tryCatch(
            async () => {
                const res = await createBranchManager(formData);
                if ((res as any)?.data?.success) {
                    navigate("/users");
                }
                return res;
            },
            "Branch Manager Created Successfully",
            "Creating Branch Manager"
        );
    };

    return (
        <div className="w-11/12 md:w-8/12 mx-auto flex flex-col justify-center gap-5 mt-5 px-8 py-8 shadow-lg bg-white rounded-2xl">
            <h3 className="text-primary-400 text-2xl font-semibold">
                CREATE BRANCH MANAGER
            </h3>
            <BranchManagerForm onSubmit={onSubmit} />
        </div>
    );
};

export default CreateBranchManager;
