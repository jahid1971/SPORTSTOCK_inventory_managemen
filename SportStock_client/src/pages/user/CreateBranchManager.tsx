/* eslint-disable @typescript-eslint/no-explicit-any */
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import tryCatch from "@/utls/tryCatch";
import { useGetAllBranchesQuery } from "@/redux/features/admin/adminApi";
import { TBranch, TUser } from "@/types/global.types";
import CustomSelect from "@/components/ui/CustomSelect";
import createUserValidate from "@/schemas/registrationValidation";
import { useCreateBranchManagerMutation } from "@/redux/api/userApi";

const CreateBranchManager = () => {
    const [createBranchManager] = useCreateBranchManagerMutation();
    const { data: branchNames, isFetching: isBranchNameFetching } =
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
        // reset,
    } = useForm<TUser & { fullName: string }>({
        resolver: zodResolver(createUserValidate),
        defaultValues: {
            password: "bm456",
        },
    });

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        formData.append("branchManagerData", JSON.stringify(data));
        formData.append("file", data?.userPhoto);
        tryCatch(
            async () => {
                const res = await createBranchManager(data);
                // reset();
                return res;
            },
            "Branch Manager Created",
            "Branch Manager Creating"
        );
        console.log(data, "dataaaaaa");
    };
    return (
        <div className=" w-11/12 md:w-6/12 mx-auto flex  flex-col  justify-center  gap-4 mt-16 px-6 py-8 bg-white">
            <h3 className="text-primary-400 text-2xl font-semibold">
                Create Barnch Manager
            </h3>
            <form
                className=" space-y-2 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FloatingInput
                    id="fullName"
                    type="text"
                    label="Full Name"
                    {...register("fullName")}
                    error={errors.fullName}
                />
                <FloatingInput
                    id="email"
                    type="text"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                />
                <Controller
                    name="userPhoto"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                        <FloatingInput
                            id="userPhoto"
                            label="Photo"
                            type="file"
                            value={(value as any)?.fileName}
                            {...field}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => onChange(e.target.files?.[0])}
                        />
                    )}
                />
                <FloatingInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Default Password"
                    label_2={viewIcon}
                    {...register("password")}
                    error={errors.password}
                />

                <CustomSelect
                    id="branch"
                    label="Branch"
                    control={control}
                    options={branchNamesOptions}
                    disabled={isBranchNameFetching}
                />

                <Button type="submit">Create</Button>
            </form>
        </div>
    );
};

export default CreateBranchManager;
