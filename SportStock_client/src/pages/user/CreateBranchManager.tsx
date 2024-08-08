/* eslint-disable @typescript-eslint/no-explicit-any */
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";

import {  FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import tryCatch from "@/utls/tryCatch";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import { TBranch, TUser } from "@/types/global.types";
import CustomSelect from "@/components/ui/CustomSelect";
import createUserValidate from "@/schemas/registrationValidation";
import { useCreateBranchManagerMutation } from "@/redux/api/userApi";
import FileUploader from "@/components/ui/FileUploader";

const CreateBranchManager = () => {
    const [createBranchManager] = useCreateBranchManagerMutation();
    const { data: branchNames, isFetching: isBranchNameFetching }:any =
        useGetAllBranchesQuery(undefined);
    const branchNamesOptions = branchNames?.data?.data?.map(
        (branch: TBranch) => ({
            value: branch._id,
            label: branch.branchName,
        })
    );
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const viewIcon = (
        <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
    );

    // useForm hook.....
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
        watch,
        // reset,
    } = useForm<TUser & { fullName: string }>({
        resolver: zodResolver(createUserValidate),
        defaultValues: {
            password: "bm456",
        },
    });

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));
        formData.append("file", data?.userPhoto);
        tryCatch(
            async () => {
                const res = await createBranchManager(formData);
                return res;
            },
            "Branch Manager Created",
            "Branch Manager Creating",
            () => reset()
        );
    };

    return (
        <div className=" w-11/12 md:w-8/12 mx-auto flex  flex-col  justify-center  gap-4 mt-5 px-8 py-8 bg-white">
            <h3 className="text-primary-400 text-2xl font-semibold">
                Create Barnch Manager
            </h3>
            <form
                className=" space-y-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FloatingInput
                    id="fullName"
                    type="text"
                    label="Full Name"
                    {...register("fullName")}
                    error={errors.fullName}
                    className="bg-primary-50"
                />
                <FloatingInput
                    id="email"
                    type="text"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                    className="bg-primary-50"
                />

                <FileUploader
                    id="userPhoto"
                    control={control}
                    className="bg-primary-50 border-0 border-b-[1px]"
                    watch={watch}
                />
                <FloatingInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Default Password"
                    label_2={viewIcon}
                    {...register("password")}
                    error={errors.password}
                    className="bg-primary-50"
                />

                <CustomSelect
                    id="branch"
                    label="Branch"
                    control={control}
                    options={branchNamesOptions}
                    disabled={isBranchNameFetching}
                    className="bg-primary-50"
                />
                <FloatingInput
                    id="contactNumber"
                    type="text"
                    label="Contact Number"
                    {...register("contactNumber")}
                    error={errors.contactNumber}
                    className="bg-primary-50"
                />
                <FloatingInput
                    id="address"
                    type="text"
                    label="Address"
                    {...register("address")}
                    error={errors.address}
                    className="bg-primary-50"
                />
  

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
};

export default CreateBranchManager;
