/* eslint-disable @typescript-eslint/no-explicit-any */
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import {  useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { TUser } from "@/types/global.types";
import FileUploader from "@/components/ui/FileUploader";

type AdminFormProps = {
    defaultValues?: Partial<TUser>;
    onSubmit: any,
    isEditMode?: boolean;
    isSubmitting?: boolean;
};

const AdminForm = ({
    defaultValues,
    onSubmit,
    isEditMode = false,
    isSubmitting = false,
}: AdminFormProps) => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, dirtyFields },
        watch,
        reset,
    } = useForm<TUser>({
        defaultValues,
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const viewIcon = (
        <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
    );

    return (
        <form
            onSubmit={handleSubmit((data) =>
                onSubmit(data, { reset, dirtyFields })
            )}
            className="space-y-4 w-full"
        >
            <FloatingInput
                id="fullName"
                type="text"
                label="Full Name"
                {...register("fullName", { required: "Full name is required" })}
                error={errors.fullName}
                className="bg-primary-50"
            />
            <FloatingInput
                id="email"
                type="text"
                label="Email"
                {...register("email", { 
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address"
                    }
                })}
                error={errors.email}
                className="bg-primary-50"
            />
            <FileUploader
                id="userPhoto"
                control={control}
                className="bg-primary-50 border-0 border-b-[1px]"
                watch={watch}
            />
            {!isEditMode && (
                <FloatingInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Default Password"
                    label_2={viewIcon}
                    {...register("password", { required: !isEditMode && "Password is required" })}
                    error={errors.password}
                    className="bg-primary-50"
                />
            )}
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
            <Button type="submit" disabled={isSubmitting}>
                {isEditMode ? "Update" : "Create"}
            </Button>
        </form>
    );
};

export default AdminForm;