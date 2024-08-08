import { FloatingInput } from "@/components/ui/InputFloatingLabel";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/Hooks";

import {
    useChangePasswordMutation,
    useLogOutMutation,
} from "@/redux/api/authApi";
import { nullifyState } from "@/redux/features/auth/authSlice";
import tryCatch from "@/utls/tryCatch";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm();

    const [changePassword] = useChangePasswordMutation();
    const [signOut] = useLogOutMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        tryCatch(
            async () => {
                const res:any = await changePassword(data).unwrap();

                if (res?.success) {
                    signOut({});
                    dispatch(nullifyState());
                    navigate("/login");
                }
                return res;
            },
            "Password Changed Successfully",
            "Changing Password"
        );
    };
    return (
        <div className="w-11/12  md:w-7/12 mx-auto flex  flex-col  justify-center  gap-4 mt-16 bg-white p-6 shadow-lg rounded-lg">
            <Text variant={"h3"} className="text-primary-500">
                CHANGE PASSWORD
            </Text>
            <form
                className=" space-y-4 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FloatingInput
                    id="oldPassword"
                    type="text"
                    label="Old Password"
                    {...form.register("oldPassword")}
                    className="bg-primary-100"
                />
                <FloatingInput
                    id="newPassword"
                    type="password "
                    label="New Password"
                    {...form.register("newPassword")}
                    className="bg-primary-100"
                />

                <Button type="submit">Change Password</Button>
            </form>
        </div>
    );
};

export default ChangePassword;
