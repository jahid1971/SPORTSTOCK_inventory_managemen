import { useForm } from "react-hook-form";
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [resetPassword] = useResetPasswordMutation();
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("id") || "";
    const token = searchParams.get("token") || "";

    const onSubmit = async (data: { newPassword: string }) => {
        setMessage("");
        try {
            await resetPassword({ id, token, newPassword: data.newPassword }).unwrap();
            setMessage("Password reset successfully. Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (e: any) {
            setMessage(e?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col gap-6 border border-primary-100 dark:border-gray-800">
                <h3 className="text-primary-600 dark:text-primary-400 text-2xl font-bold mb-2">Reset Password</h3>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <FloatingInput
                        id="newPassword"
                        type="password"
                        label="New Password"
                        {...register("newPassword", { required: "New password is required" })}
                        error={errors.newPassword}
                        className="bg-primary-50 dark:bg-gray-800"
                    />
                    <Button type="submit" className="w-full bg-primary-600 text-white">Reset Password</Button>
                </form>
                {message && <div className="text-center text-sm mt-2">{message}</div>}
            </div>
        </div>
    );
};

export default ResetPassword;

