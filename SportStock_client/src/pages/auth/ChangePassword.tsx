import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";

import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import tryCatch from "@/utls/tryCatch";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm();

    const [changePassword] = useChangePasswordMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        tryCatch(
            async () => {
                const res = await changePassword(data).unwrap();
                if (res?.success) {
                    dispatch(logOut());
                    navigate("/login");
                }
            },
            "Password Changed Successfully",
            "Changing Password"
        );
    };
    return (
        <div className="h-screen w-11/12 md:w-4/12 mx-auto flex  flex-col  justify-center  gap-2">
            <Text variant={"h3"} className="text-primary-500">
                CHANGE PASSWORD
            </Text>
            <form className=" space-y-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <FloatingInput
                    id="oldPassword"
                    type="text"
                    label="Old Password"
                    {...form.register("oldPassword")}
                />
                <FloatingInput
                    id="newPassword"
                    type="password "
                    label="New Password"
                    {...form.register("newPassword")}
                />

                <Button type="submit">Change Password</Button>
            </form>
        </div>
    );
};

export default ChangePassword;
