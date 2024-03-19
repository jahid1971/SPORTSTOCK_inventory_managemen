import { useForm } from "react-hook-form";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import tryCatch from "@/utls/tryCatch";
import { TSportType } from "@/types/product";
import { useCreateBranchMutation } from "@/redux/features/admin/adminApi";

const CreateBranch = () => {
    const [createBranch] = useCreateBranchMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm();
    const onSubmit = async (data: Partial<TSportType>) => {
        tryCatch(async () => await createBranch(data), "Branch Created Successfully", "Creating Branch");
    };
    return (
        <div className="p-5">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <FloatingInput
                    id="branchName"
                    label="Branch Name"
                    {...register("branchName", { required: "Branch Name is required" })}
                    error={errors.branchName}
                />
                <FloatingInput
                    id="branchLocation"
                    label="Branch Location"
                    {...register("branchLocation", { required: "Branch Location is required" })}
                    error={errors.sportType}
                />

                <DialogClose disabled={!isValid} asChild className="mt-3 mr-auto">
                    <Button size={"xsm"} type="submit">
                        Create Branch
                    </Button>
                </DialogClose>
            </form>
        </div>
    );
};

export default CreateBranch;
