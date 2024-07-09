import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";
import { useLogInMutation } from "@/redux/api/authApi";
import {  setUser } from "@/redux/features/auth/authSlice";

import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import tryCatch from "@/utls/tryCatch";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/types/global.types";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const viewIcon = (
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            // email: "user8@example.com",
            // password: "user456",
            email: "mrx@gmail.com",
            password: "admin123",
        },
    });

    const [logIn] = useLogInMutation();

    const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const res = await logIn(data).unwrap();

                const user = jwtDecode(res?.data?.token) as TUser;

                dispatch(setUser({ user: user, token: res.data.token }));
                console.log(user, "user");

                if (res.data?.user?.needsPasswordChange) {
                    navigate("/change-password");
                } else navigate(`/dashboard`);

                return res;
            },
            "Logged in successfully",
            "Logging in"
        );
    };
    return (
        <div className="h-screen w-11/12 md:w-4/12 mx-auto flex  flex-col  justify-center  gap-2">
            <h3 className="text-primary-500 text-2xl font-semibold">LOG IN</h3>
            <form className=" space-y-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                <FloatingInput
                    id="email"
                    type="email"
                    label="Email"
                    {...register("email", { required: "Email is required" })}
                    error={errors.email}
                />
                <FloatingInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Password"
                    label_2={viewIcon}
                    {...register("password", { required: "Password is required" })}
                    error={errors.password}
                />

                <Button type="submit">Log in</Button>
            </form>
        </div>
    );
};

export default LogIn;
