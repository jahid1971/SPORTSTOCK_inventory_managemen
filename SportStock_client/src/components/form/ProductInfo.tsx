/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FloatingInput } from "../ui/InputFloatingLabel";
import { Controller } from "react-hook-form";
import { PiPlusCircleBold } from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import CustomSelect from "../ui/CustomSelect";
import { useGetAllBrandNamesQuery } from "@/redux/features/product/productApi";
import { TBrand } from "@/types/product";
import AddBrand from "../product/AddBrand";
import { productSizeOptions } from "@/constants/product";
import { TextArea } from "../ui/TextArea";
import FileUploader from "../ui/FileUploader";

const ProductInfo = ({ control }: { control: any }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const { data: brandNames, isFetching: isBrandNameFetching } =
        useGetAllBrandNamesQuery(undefined);

    const brandNamesOptions = brandNames?.data?.map((brand: TBrand) => ({
        value: brand._id,
        label: brand.brandName,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 items-end w-full">
            <div className="md:col-span-2">
                <FileUploader control={control} id="image" />
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
                    id="brand"
                    label="Brand Name"
                    control={control}
                    options={brandNamesOptions}
                    disabled={isBrandNameFetching}
                />
            </div>
            <CustomSelect
                id="size"
                label="product Size"
                control={control}
                options={productSizeOptions}
            />

            <FloatingInput id="color" label="color" control={control} />

            <CustomSelect
                id="material"
                label="Material"
                control={control}
                options={[
                    { value: "leather", label: "Leather" },
                    { value: "fabric", label: "Fabric" },
                    { value: "synthetic", label: "Synthetic" },
                    { value: "metal", label: "Metal" },
                    { value: "plastic", label: "Plastic" },
                    { value: "wood", label: "Wood" },
                ]}
            />


            <div className="md:col-span-2">
                <TextArea
                    id="description"
                    label="Description"
                    rows={3}
                    control={control}
                />
            </div>
        </div>
    );
};

export default ProductInfo;
