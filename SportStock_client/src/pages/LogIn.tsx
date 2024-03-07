import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { TUser, setUser } from "@/redux/features/auth/authSlice";
import { tryCatch } from "@/utls/tryCatch";
import { verifyTYoken } from "@/utls/verifyToken";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

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
        // defaultValues: {
        //     id: "0002",
        //     password: "admin456",
        // },
    });

    const [logIn] = useLogInMutation();

    const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const userInfo = {
                    id: data.id,
                    password: data.password,
                };

                const res = await logIn(userInfo).unwrap();

                const user = verifyTYoken(res.data.accessToken) as TUser;

                console.log(user);

                dispatch(setUser({ user: user, token: res.data.accessToken }));
                if (res.data.needsPasswordChange) {
                    navigate("/change-password");
                } else navigate(`/${user.role}`);
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
