/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
    id: string;
    control: any;
    label: string;
    rules: any;
};

export function DatePicker({ id, control, label, rules }: TDatePickerProps) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    return (
        <Controller
            name={id}
            control={control}
            defaultValue={new Date()}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <Popover
                        open={isPopoverOpen}
                        onOpenChange={setIsPopoverOpen}
                        modal
                    >
                        <PopoverTrigger
                            data-state={field.value ? "open" : "closed"}
                            asChild
                        >
                            <button
                                className={cn(
                                    "relative flex  w-full items-center justify-between    py-2  focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1  px-2.5  pt-6 text-gray-900 bg-background dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:ring-0   ",
                                    { "border-primary-500": isPopoverOpen }
                                )}
                            >
                                {field.value && format(field.value, "PPP")}

                                <span
                                    className={cn(
                                        "pointer-events-none absolute  text-gray-500 dark:text-gray-200 duration-300 transform origin-[0]  -translate-y-6 scale-75 px-2 left-1 cursor-text ",
                                        {
                                            "-translate-y-1 scale-100 text-gray-500 ":
                                                !field.value,
                                        },
                                        { "text-primary-500": isPopoverOpen }
                                    )}
                                >
                                    {label}
                                </span>

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0 z-50 overflow-y-auto">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                    field.onChange(date);
                                    setIsPopoverOpen(false);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <div>
                        {error && (
                            <p className="text-red-500 text-sm">
                                {error.message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        />
    );
}
