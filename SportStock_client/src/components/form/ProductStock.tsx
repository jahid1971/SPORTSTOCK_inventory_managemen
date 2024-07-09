/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSelect from "../ui/CustomSelect";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { PiPlusCircleBold } from "react-icons/pi";
import CreateBranch from "../product/CreateBranch";
import { useGetAllBranchesQuery } from "@/redux/features/admin/adminApi";
import { TBranch } from "@/types/global.types";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { useCurrentUser } from "@/redux/Hooks";
import { userRole } from "@/constants/user";

const ProductStock = ({ control }: { control: any }) => {
    const { data: branchNames, isFetching: isBranchNameFetching } = useGetAllBranchesQuery(undefined);

    const user = useCurrentUser();

    const branchNamesOptions = branchNames?.data?.map((branch: TBranch) => ({
        value: branch._id,
        label: branch.branchName,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
            <div>
                {user?.role === userRole.SUPER_ADMIN && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                                <PiPlusCircleBold />
                                Add New
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <CreateBranch isModalTrue />
                        </DialogContent>
                    </Dialog>
                )}
                <CustomSelect
                    id="branch"
                    label="Branch Name"
                    control={control}
                    options={branchNamesOptions}
                    disabled={isBranchNameFetching}
                />
            </div>
            <FloatingInput id="quantity" label="Product Quantity" type="number" control={control} />
        </div>
    );
};

export default ProductStock;
