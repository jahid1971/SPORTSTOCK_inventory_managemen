import { useForm } from "react-hook-form";
import CustomSelect from "../ui/CustomSelect";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { PiPlusCircleBold } from "react-icons/pi";
import CreateBranch from "../product/CreateBranch";

const ProductStock = () => {
    const { control } = useForm();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
                  <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                                <PiPlusCircleBold />
                                Add New
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <CreateBranch />
                        </DialogContent>
                    </Dialog>
                    <CustomSelect
                        id="branchName"
                        label="Branch Name"
                        control={control}
                        // options={sportTypesOptions}
                        // disabled={isSportTypeFetching}
                    />
                </div>
    </div>
  );
};

export default ProductStock;