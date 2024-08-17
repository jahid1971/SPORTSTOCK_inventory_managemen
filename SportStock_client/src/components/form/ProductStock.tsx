/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSelect from "../ui/CustomSelect";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { PiPlusCircleBold } from "react-icons/pi";

import { FloatingInput } from "../ui/InputFloatingLabel";

import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import CreateCategory from "../product/createCategory";
import { TCategory } from "@/types/product";

const ProductStock = ({ control }: { control: any }) => {
    const { data: categorys, isFetching: isCategoryFetching }: any =
        useGetAllCategoriesQuery(undefined);

    const categorysOptions = categorys?.data?.map((category: TCategory) => ({
        value: category._id,
        label: category?.category,
    }));

    if (isCategoryFetching) return <div>loading</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
            <FloatingInput
                id="productName"
                label="Product Name"
                control={control}
                required
            />
            {/* <div>
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
                    required
                />
            </div> */}
            <FloatingInput
                id="price"
                label="Product Price"
                label_2="taka   "
                type="number"
                control={control}
                required
            />
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                            <PiPlusCircleBold />
                            Add New
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <CreateCategory />
                    </DialogContent>
                </Dialog>
                <CustomSelect
                    id="category"
                    label="Category"
                    control={control}
                    options={categorysOptions}
                    disabled={isCategoryFetching}
                    required
                />
            </div>

            <FloatingInput
                id="productCode"
                label="Product Code (Unique)"
                control={control}
                required
            />
        </div>
    );
};

export default ProductStock;
