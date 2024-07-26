import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import CustomSelect from "../../ui/CustomSelect";
import tryCatch from "@/utls/tryCatch";
import { statusOptions } from "@/constants/user";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { CustomCellRendererProps } from "@ag-grid-community/react";

export const UpdateButton = ({ updateParams, setUpdateParams }: any) => {
    const { control, handleSubmit } = useForm();
    const [updateUserStatus] = useUpdateUserStatusMutation();



    const options = statusOptions.filter(
        (option) => option.value !== updateParams?.status
    );

    const onSubmit = (data: any) => {
        const updateData = { id: updateParams?._id, data: data };

        tryCatch(
            async () => await updateUserStatus(updateData),
            "User status updated successfully",
            "Updating user status",
            () => setUpdateParams(null)
        );
    };

    return (
        <Dialog
            open={!!updateParams}
            onOpenChange={() => setUpdateParams(null)}
        >
            <DialogContent className="sm:max-w-[425px]">
                <h4 className="text-lg">
                    Current Status :{" "}
                    <span className="text-primary">
                        {updateParams?.status}
                    </span>
                </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CustomSelect
                        label="Update Status"
                        id="status"
                        control={control}
                        options={options}
                    />

                    <Button type="submit" className="mt-3 mr-auto">
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
