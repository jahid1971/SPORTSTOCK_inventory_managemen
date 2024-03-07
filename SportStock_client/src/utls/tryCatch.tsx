import { toast } from "sonner";

type ActionFunction = () => Promise<any>;

type ResetFunction = () => void; // Define a type for the reset function

type WithErrorHandlingFunction = (
    action: ActionFunction,
    successMessage: string,
    toastId?: string | undefined,
    reset?: ResetFunction
) => Promise<void>;

export const tryCatch: WithErrorHandlingFunction = async (
    action,
    successMessage,
    toastId,
    reset
) => {
    toastId = (toastId ? toast.loading(`${toastId}...`) : undefined) as string | undefined;

    try {
        const res = await action();
        console.log(res, "res in try block");

        if (res?.success || res?.data?.success || res?.data?.data?.success) {
            toast.success(successMessage, { id: toastId });
            if (reset) reset();
        } else if (res?.error?.data?.message) toast.error(res?.error?.data?.message, { id: toastId });
        else toast.error("Something went wrong",  { id: toastId });
    } catch (err) {
        console.log(err, " in catch block");
        err?.data?.message
            ? toast.error(err?.data?.message, { id: toastId })
            : toast.error("Something went wrong ", { id: toastId });
    }
};
