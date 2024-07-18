/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";

type TInputProps = {
    className?: string;
    label: string;
    error?: any;
    id: string;
    rows?: number;
    control?: any;
    rules?: any;
};

const TextArea = forwardRef<HTMLTextAreaElement, TInputProps>(
    ({ className, label, id, error, control, rows, rules, ...props }, ref) => {
        return (
            <div className="relative z-0 w-full">
                {control ? (
                    <Controller
                        name={id}
                        control={control}
                        rules={rules}
                        defaultValue=""
                        render={({ field }) => (
                            <textarea
                                rows={rows}
                                id={id}
                                ref={ref}
                                className={cn(
                                    "block  px-2.5 pb-2.5 pt-5 w-full  text-gray-700 bg-primary-background dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer",
                                    className
                                )}
                                placeholder=" "
                                onChange={field.onChange}
                                {...props}
                            />
                        )}
                    />
                ) : (
                    <textarea
                        id={id}
                        ref={ref}
                        className={cn(
                            "block  px-2.5 pb-2.5 pt-5 w-full  text-gray-700 bg-primary-50/50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer",
                            className
                        )}
                        placeholder=" "
                        {...props}
                    />
                )}
                {<small className="text-destructive">{error?.message}</small>}

                <label
                    htmlFor={id}
                    className={cn(
                        "absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto cursor-text",
                        className
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);

export { TextArea };
