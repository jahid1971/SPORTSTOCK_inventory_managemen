/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import tryCatch from "@/utls/tryCatch";
import { useCreateAdminMutation } from "@/redux/api/userApi";
import AdminForm from "@/components/form/AdminForm";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
    const [createAdmin] = useCreateAdminMutation();
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
                const res = await createAdmin(formData);
                if ((res as any)?.data?.success) {
                    navigate("/users");
                }
                return res;
            },
            "Admin Created Successfully",
            "Creating Admin"
        );
    };

    return (
        <div className="w-11/12 md:w-8/12 mx-auto flex flex-col justify-center gap-5 mt-5 px-8 py-8 shadow-lg bg-white rounded-2xl">
            <h3 className="text-primary-400 text-2xl font-semibold">
                CREATE ADMIN
            </h3>
            <AdminForm onSubmit={onSubmit} />
        </div>
    );
};

export default CreateAdmin;