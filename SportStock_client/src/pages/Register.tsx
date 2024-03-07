import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { TUser, setUser } from "@/redux/features/auth/authSlice";
import registerValidate from "@/schemas/registrationValidation";
import { tryCatch } from "@/utls/tryCatch";
import { verifyTYoken } from "@/utls/verifyToken";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const viewIcon = (
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
    );

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(registerValidate),
    });

    const [logIn] = useLogInMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log("data", data);
        // tryCatch(
        //     async () => {
        //         const userInfo = {
        //             id: data.id,
        //             password: data.password,
        //         };

        //         const res = await logIn(userInfo).unwrap();

        //         const user = verifyTYoken(res.data.accessToken) as TUser;

        //         console.log(user);

        //         dispatch(setUser({ user: user, token: res.data.accessToken }));
        //         if (res.data.needsPasswordChange) {
        //             navigate("/change-password");
        //         } else navigate(`/${user.role}`);
        //         return res;
        //     },
        //     "Logged in successfully",
        //     "Logging in"
        // );
    };
    return (
        <div className="h-screen w-11/12 md:w-4/12 mx-auto flex  flex-col  justify-center  gap-2">
            <h3 className="text-primary-500 text-2xl font-semibold">SIGN UP</h3>
            <form className=" space-y-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                <FloatingInput
                    id="name"
                    type="text"
                    label="Full Name"
                    {...register("name")}
                    error={errors.name}
                />
                <FloatingInput
                    id="email"
                    type="text"
                    label="Email"
                    {...register("email")}
                    error={errors.email}
                />
                <FloatingInput
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Password"
                    label_2={viewIcon}
                    {...register("password")}
                    error={errors.password}
                />
                <FloatingInput
                    id="confirmPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Confirm Password"
                    label_2={viewIcon}
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                />
                <FloatingInput
                    id="branch"
                    type="text"
                    label="Branch"
                    {...register("branch")}
                    error={errors.branch}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default Register;
