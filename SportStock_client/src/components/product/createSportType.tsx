import { useForm } from "react-hook-form";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useCreateSportTypeMutation } from "@/redux/features/product/productApi";
import tryCatch from "@/utls/tryCatch";
import { TSportType } from "@/types/product";

const CreateSportType = () => {
    const [createSportType] = useCreateSportTypeMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm();
    const onSubmit = async (data: Partial<TSportType>) => {
        tryCatch(
            async () => await createSportType(data),
            "Sport Type Created Successfully",
            "Creating Sport Type"
        );
    };
    return (
        <div className="p-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return handleSubmit(onSubmit)();
                }}>
                <FloatingInput
                    id="sportType"
                    label="Create SportType"
                    {...register("sportType", { required: "Sport Type is required" })}
                    error={errors.sportType}
                />

                <DialogClose disabled={!isValid} asChild className="mt-3 mr-auto">
                    <Button size={"xsm"} type="submit">
                        Create Sport Type
                    </Button>
                </DialogClose>
            </form>
        </div>
    );
};

export default CreateSportType;
