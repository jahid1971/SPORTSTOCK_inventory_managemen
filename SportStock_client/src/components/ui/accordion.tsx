import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    noIcon?: boolean;
}

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(({ className, children, noIcon, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                // removed transition-all
                "flex flex-1 items-center justify-between [&[data-state=open]>svg]:rotate-180 focus:outline-none",
                className
            )}
            {...props}>
            {children}
            <ChevronDown
                className={`${noIcon && "lg:hidden"} h-4 w-4 shrink-0 transition-transform duration-200`}
            />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden  transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down outline-none"
        {...props}>
        <div className={cn("pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const CustomAccordion: React.FC<{
    accordionTrigger: React.ReactNode;
    children: React.ReactNode;
    triggerClassName?: string;
}> = ({ accordionTrigger, triggerClassName, children }) => (
    <Accordion defaultValue="item-1" type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger className={triggerClassName}>{accordionTrigger}</AccordionTrigger>
            <AccordionContent className="pt-5">{children}</AccordionContent>
        </AccordionItem>
    </Accordion>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, CustomAccordion };
