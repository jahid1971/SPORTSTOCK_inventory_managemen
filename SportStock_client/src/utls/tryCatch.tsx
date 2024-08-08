/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

type ActionFunction = () => Promise<any>;

type WithErrorHandlingFunction = (
    action: ActionFunction,
    successMessage: string,
    toastId?: string | undefined,
    action_2?: () => void
) => Promise<void>;

export const tryCatch: WithErrorHandlingFunction = async (
    action,
    successMessage,
    loadingMessage,
    action_2
) => {
    const toastId = (loadingMessage ? toast.loading(`${loadingMessage}...`) : undefined) as
        | string
        | undefined;

    try {
        const res = await action();
        console.log(res, "res in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            toast.success(successMessage, { id: toastId });
            if (action_2) action_2();
        } else if (res?.error?.data?.message || res?.error?.data?.errorMessage)
            toast.error(res?.error?.data?.errorMessage || res?.error?.data?.message, { id: toastId });
        else if (res?.error) toast.error("Something went wrong", { id: toastId });

        return res;
    } catch (err:any) {
        console.log(err, " in catch block");
        err?.data?.message || err?.data?.errorMessage
            ? toast.error(err?.data?.errorMessage || err?.data?.message, { id: toastId })
            : toast.error("Something went wrong ", { id: toastId });
    }
};
export default tryCatch;
