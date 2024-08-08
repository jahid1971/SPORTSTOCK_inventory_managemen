import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";

export function CustomCombobox({
    options,

    label,
    id,
    control,
    required,

}: {
    options: { value: string; label: string }[];
    className?: string;
    label: string;
    id: string;
    error?: any;
    control?: any;
    rules?: any;
    required?: boolean;
    [x: string]: any;
}) {
    const [open, setOpen] = React.useState(false);
    // const [value, setValue] = React.useState("");

    return (
        <Controller
            name={id}
            control={control}
            rules={required ? { required: `Item is required` } : undefined}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-full"
                            size={"sm"}
                        >
                            {field.value
                                ? options?.find(
                                      (option) => option?.value === field.value
                                  )?.label
                                : label}
                        </Button>
                    </PopoverTrigger>

                    {error && <p className="text-red-600">{error.message}</p>}

                    <PopoverContent className="w-[--radix-popover-trigger-width]">
                        <Command>
                            <CommandInput placeholder="Search option..." />
                            <CommandList>
                                <CommandEmpty>No option found.</CommandEmpty>
                                <CommandGroup>
                                    {options?.map((option) => (
                                        <CommandItem
                                            key={option?.value}
                                            value={option?.value}
                                            onSelect={(currentValue) => {
                                                // setValue(currentValue);
                                                field.onChange(currentValue);
                                                setOpen(false);
                                            }}
                                            keywords={[option.label]}
                                        >
                                            {option?.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    field.value ===
                                                        option?.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    );
}
