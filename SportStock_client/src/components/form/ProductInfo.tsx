import React from "react";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { useForm } from "react-hook-form";
import { PiPlusCircleBold } from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CreateSportType from "../product/createSportType";
import CustomSelect from "../ui/CustomSelect";
import { useGetAllBrandNamesQuery, useGetAllSportTypesQuery } from "@/redux/features/product/productApi";
import { TBrand, TSportType } from "@/types/product";
import AddBrand from "../product/AddBrand";

const ProductInfo = () => {
    const { data: sportTypes, isFetching: isSportTypeFetching } = useGetAllSportTypesQuery(undefined);
    const { data: brandNames, isFetching: isBrandNameFetching } = useGetAllBrandNamesQuery(undefined);
    const { control } = useForm();
    console.log(sportTypes, "sportTypes");

    const sportTypesOptions = sportTypes?.data?.map((sportType: TSportType) => ({
        value: sportType._id,
        label: sportType.sportType,
    }));
    const brandNamesOptions = brandNames?.data?.map((brand: TBrand) => ({
        value: brand._id,
        label: brand.brandName,
    }));

    return (
        <form action="">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
                <FloatingInput id="productName" label="Product Name" control={control} />
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                                <PiPlusCircleBold />
                                Add New
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <CreateSportType />
                        </DialogContent>
                    </Dialog>
                    <CustomSelect
                        id="SportType"
                        label="Sport Type"
                        control={control}
                        options={sportTypesOptions}
                        disabled={isSportTypeFetching}
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center gap-1 justify-end  font-medium cursor-pointer">
                                <PiPlusCircleBold />
                                Add New
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <AddBrand />
                        </DialogContent>
                    </Dialog>
                    <CustomSelect
                        id="brandName"
                        label="Brand Name"
                        control={control}
                        options={brandNamesOptions}
                        disabled={isBrandNameFetching}
                    />
                </div>
            </div>
        </form>
    );
};

export default ProductInfo;
