import { useForm } from "react-hook-form";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import tryCatch from "@/utls/tryCatch";
import { TSportType } from "@/types/product";
import { useCreateBranchMutation } from "@/redux/features/admin/adminApi";

const CreateBranch = ({ isModalTrue }: { isModalTrue?: boolean }) => {
    const [createBranch] = useCreateBranchMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, errors },
    } = useForm();

    const onSubmit = async (data: Partial<TSportType>) => {
        tryCatch(
            async () => {
                const res = await createBranch(data);
                reset();
                return res;
            },
            "Branch Created Successfully",
            "Creating Branch"
        );
    };
    return (
        <div className="p-5">
            <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return handleSubmit(onSubmit)();
                }}>
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

                {isModalTrue ? (
                    <DialogClose disabled={!isValid} asChild className="mt-3 mr-auto">
                        <Button size={"xsm"} type="submit">
                            Create Branch
                        </Button>
                    </DialogClose>
                ) : (
                    <Button size={"xsm"} type="submit" className="w-28">
                        Create Branch
                    </Button>
                )}
            </form>
        </div>
    );
};

export default CreateBranch;
