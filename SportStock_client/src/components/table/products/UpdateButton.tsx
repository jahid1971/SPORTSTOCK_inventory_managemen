import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import CustomSelect from "../../ui/CustomSelect";
import { useUpdateUserStatusMutation } from "@/redux/features/shared/sharedApi";
import tryCatch from "@/utls/tryCatch";
import { statusOptions } from "@/constants/user";

export const UpdateButton = (params: any) => {
    const { control, handleSubmit } = useForm();
    const [updateUserStatus] = useUpdateUserStatusMutation();

    const options = statusOptions.filter((option) => option.value !== params.data.status);

    const onSubmit = (data: any) => {
        const updateData = { id: params.data._id, data: data };
        tryCatch(
            async () => await updateUserStatus(updateData),
            "User status updated successfully",
            "Updating user status"
        );
    };

    return (
        params.data.role !== "superAdmin" && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                        Update Status
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <h4 className="text-lg">
                        Current Status : <span className="text-primary">{params.data.status}</span>
                    </h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomSelect label="Update Status" id="status" control={control} options={options} />

                        <DialogClose asChild className="mt-3 mr-auto">
                            <Button type="submit">Update</Button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
        )
    );
};
