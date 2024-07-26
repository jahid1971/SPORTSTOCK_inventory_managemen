

import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";
// import { useLogInMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import tryCatch from "@/utls/tryCatch";
import { jwtDecode } from "jwt-decode";
import { TUser } from "@/types/global.types";
import { useLogInMutation } from "@/redux/api/authApi";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const viewIcon = (
        <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="focus:outline-none"
        >
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "mrx@gmail.com",
            password: "admin123",
        },
    });

    const [logIn] = useLogInMutation();

    const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const res: any = await logIn(data).unwrap();

                dispatch(
                    setUser({ user: res?.data?.user, token: res?.data?.token })
                );
                console.log(res?.data, " res?.data");
                if (res.data?.user?.needsPasswordChange) {
                    navigate("/change-password");
                } else if (res?.data?.user) {
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 100);
                }

                return res;
            },
            "Logged in successfully",
            "Logging in"
        );
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col gap-6 border border-primary-100 dark:border-gray-800">
                <div className="flex flex-col items-center gap-2">
                    <h3 className="text-primary-600 dark:text-primary-400 text-3xl font-bold tracking-tight">
                        Log In
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Welcome back! Please enter your credentials.
                    </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <FloatingInput
                        id="email"
                        type="email"
                        label="Email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        error={errors.email}
                        className="bg-primary-50 dark:bg-gray-800"
                    />
                    <FloatingInput
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        label="Password"
                        label_2={viewIcon}
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={errors.password}
                        className="bg-primary-50 dark:bg-gray-800"
                    />
                    <div className="flex justify-end">
                        <a
                            href="#"
                            className="text-xs text-primary-500 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg shadow transition-colors"
                    >
                        Log in
                    </Button>
                </form>
                <div className=" text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-primary hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
