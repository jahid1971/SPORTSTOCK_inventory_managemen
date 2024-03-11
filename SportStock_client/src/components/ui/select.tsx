import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "relative flex  w-full items-center justify-between    py-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1  px-2.5  pt-6 text-gray-900 bg-primary-50/50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:ring-0 focus:border-primary-600 data-[state=open]:border-primary-600 data-[state=closed]:border-gray-300 ",
            className
        )}
        {...props}>
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50 mb-0.5" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// added extra label for the select trigger...................................
const SelectLabel = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <label htmlFor="">
        <SelectPrimitive.Trigger
            asChild
            className={cn(
                " pointer-events-none absolute  text-gray-500 dark:text-gray-200 duration-300 transform origin-[0]  -translate-y-8 scale-75 px-2",
                "left-1 cursor-text",
                "data-[placeholder]:-translate-y-4 data-[placeholder]:scale-100 data-[placeholder]:text-gray-500",
                "data-[state=open]:px-2 data-[state=open]:text-primary data-[state=open]:dark:text-primary-500 ",
                // "bg-gray-500 ",
                className
            )}>
            <p> {children}</p>
        </SelectPrimitive.Trigger>
    </label>
);

const SelectValue = ({ className }: { className?: string }) => (
    <div className={cn("mr-auto absolute", className)}>
        <SelectPrimitive.Value></SelectPrimitive.Value>
    </div>
);

const SelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn("flex cursor-default items-center justify-center py-1", className)}
        {...props}>
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn("flex cursor-default items-center justify-center py-1", className)}
        {...props}>
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-64 overflow-y-auto min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}>
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    "p-1",
                    position === "popper" &&
                        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}>
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const ItemLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm ", className)} {...props} />
));
ItemLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-primary-50/50 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
            className
        )}
        {...props}>
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectLabel,
    SelectContent,
    ItemLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
