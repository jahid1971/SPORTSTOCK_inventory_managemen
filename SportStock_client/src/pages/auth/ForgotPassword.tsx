import { useForm } from "react-hook-form";
import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm() as any;
    const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: { email: string }) => {
        setMessage("");
        try {
            await forgotPassword(data.email).unwrap();
            setSuccess(true);
        } catch (e: any) {
            setMessage(e?.data?.errorMessage || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col gap-6 border border-primary-100 dark:border-gray-800">
                {!success ? (
                    <>
                        <h3 className="text-primary-600 dark:text-primary-400 text-2xl font-bold mb-2">
                            Forgot Password
                        </h3>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
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
                            <Button
                                type="submit"
                                className="w-full bg-primary-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                        {message && (
                            <div className="text-center text-sm mt-2 text-red-600">
                                {message}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-4">
                            <FiMail className="text-primary-600 dark:text-primary-400 text-4xl" />
                        </div>
                        <h4 className="text-xl font-semibold text-primary-700 dark:text-primary-300">
                            Check your email
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                           you will receive a password reset link shortly.
                        </p>
                        <Button
                            className="mt-4 w-full bg-primary-600 text-white"
                            onClick={() => setSuccess(false)}
                        >
                            Back to Forgot Password
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
