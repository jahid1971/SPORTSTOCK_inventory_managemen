import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type option = Record<"value" | "label", string>;

export default function MultiSelect({ options }: { options: option[] }) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<option[]>([]);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = React.useCallback((option: option) => {
        setSelected((prev) => prev.filter((s) => s.value !== option.value));
    }, []);

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    setSelected((prev) => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, []);

    const selectables = options?.filter((option) => !selected.includes(option));

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <CommandList>
                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex gap-1 flex-wrap">
                        {selected.map((option) => {
                            return (
                                <Badge key={option.value} variant="secondary">
                                    {option.label}
                                    <button
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(option);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={() => handleUnselect(option)}>
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })}
                        {/* Avoid having the "Search" Icon */}
                        <CommandPrimitive.Input
                            ref={inputRef}
                            value={inputValue}
                            onValueChange={setInputValue}
                            onBlur={() => setOpen(false)}
                            onFocus={() => setOpen(true)}
                            placeholder="Select options..."
                            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                    </div>
                </div>
                <div className="absolute w-[320px] lg:w-[500px] mt-2">
                    {open && selectables.length > 0 ? (
                        <div className="absolute w-full top-0 z-10 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full z-50 overflow-auto">
                                {selectables.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                setInputValue("");
                                                setSelected((prev) => [...prev, option]);
                                            }}
                                            className={"cursor-pointer"}>
                                            {option.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </div>
            </CommandList>
        </Command>
    );
}
