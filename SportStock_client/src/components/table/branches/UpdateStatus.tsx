/* eslint-disable no-unsafe-optional-chaining */
import Custom_Form from "@/components/form/Custom_Form";
import CustomSelect from "@/components/ui/CustomSelect";
import { useUpdateBranchStatusMutation } from "@/redux/features/admin/adminApi";
import tryCatch from "@/utls/tryCatch";
import { CustomCellRendererProps } from "@ag-grid-community/react";
import { FieldValues } from "react-hook-form";

const UpdateBranchStatus = (params: CustomCellRendererProps) => {
    const [updateBranchStatus, { isLoading }] = useUpdateBranchStatusMutation();

    const handleUpdate = (name: string, fielValue: FieldValues) => {
        tryCatch(
            async () =>
                await updateBranchStatus({
                    id: params?.data?._id,
                    data: { status: fielValue },
                }),
            "Branch status updated successfully",
            "Updating branch status"
        );
    };
    const options = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    return (
        <Custom_Form handleFieldChange={handleUpdate}>
            {isLoading ? (
                "updating..."
            ) : (
                <CustomSelect
                    options={options}
                    label={(params?.data?.status).toUpperCase()}
                    id={"status"}
                />
            )}
        </Custom_Form>
    );
};

export default UpdateBranchStatus;
