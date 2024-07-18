import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";

const CustomInput = ({
    className,
    type = "text",
    id,
    error,
    control,
    rules,
    required,
    palceholder,
    label,
    ...props
}: {
    className?: string;
    label?: string;
    type?: string;
    id: string;
    error?: any;
    control?: any;
    rules?: any;
    palceholder?: string;
    required?: boolean;
    [x: string]: any;
}) => {
    const methods = useFormContext?.();
    const cntxtControl = methods?.control ?? control;
    return (
        <Controller
            name={id}
            control={cntxtControl}
            rules={{
                ...rules,
                required: required
                    ? `${label ?? "Field"} is required`
                    : undefined,
            }}
            defaultValue=""
            render={({ field, fieldState: { error: hookError } }) => (
                <>
                    <Input
                        type={type}
                        id={id}
                        className={cn("", className)}
                        placeholder={palceholder}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        {...props}
                    />
                    <p className="text-destructive">
                        {hookError?.message ?? error}
                    </p>
                </>
            )}
        />
    );
};

export default CustomInput;
