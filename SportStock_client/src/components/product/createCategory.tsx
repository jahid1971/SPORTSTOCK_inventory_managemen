import { useForm } from "react-hook-form";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

import tryCatch from "@/utls/tryCatch";
import { TCategory } from "@/types/product";
import { useCreateCategoryMutation } from "@/redux/features/product/productApi";

const CreateCategory = () => {
    const [createCategory] = useCreateCategoryMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm();
    const onSubmit = async (data: Partial<TCategory>) => {
        tryCatch(
            async () => await createCategory(data),
            "Category Created Successfully",
            "Creating Category"
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
                    id="category"
                    label="Create category"
                    {...register("category", { required: "Category is required" })}
                    error={errors.category}
                />

                <DialogClose disabled={!isValid} asChild className="mt-3 mr-auto">
                    <Button size={"xsm"} type="submit">
                        Create Category
                    </Button>
                </DialogClose>
            </form>
        </div>
    );
};

export default CreateCategory;
