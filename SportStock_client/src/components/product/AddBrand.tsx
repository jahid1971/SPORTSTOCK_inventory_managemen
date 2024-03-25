import { useForm } from "react-hook-form";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useAddBrandMutation, useCreateSportTypeMutation } from "@/redux/features/product/productApi";
import tryCatch from "@/utls/tryCatch";
import { TSportType } from "@/types/product";

const AddBrand = () => {
    const [addBrand] = useAddBrandMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm();

    const onSubmit = async (data: Partial<TSportType>) => {
        tryCatch(async () => await addBrand(data), "Brand Creation successfull", "Creating Brand");
    };
    return (
        <div className="p-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return handleSubmit(onSubmit)(); // key is the () in the end
                }}>
                <FloatingInput
                    id="brandName"
                    label="Add A Brand Name"
                    {...register("brandName", { required: "Brand Name is required" })}
                    error={errors.brandName}
                />

                <DialogClose disabled={!isValid} asChild className="mt-3 mr-auto">
                    <Button size={"xsm"} type="submit">
                        Add Brand Name
                    </Button>
                </DialogClose>
            </form>
        </div>
    );
};

export default AddBrand;
