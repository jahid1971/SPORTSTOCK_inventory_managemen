import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export interface ISpinner {
    size?: number;
    className?: string;
    backdrop?: boolean;
    loading?: boolean;
    label?: string;
}

export const Spinner = ({ size = 40, backdrop, label, className }: ISpinner) => {
    return (
        <div className={cn("w-[95%] mx-auto  h-[75%]   absolute flex items-center justify-center", className)}>
            {backdrop && (
                <div className="absolute inset-0 backdrop-filter backdrop-blur-[2px] z-10 bg-opacity-50 "></div>
            )}

            <span className="absolute z-20 flex flex-col items-center gap-2 ">
                <Loader className="animate-spin " style={{ animationDuration: "1.5s" }} size={size} />
                {label && <span className=" text-lg text-nowrap">{label}...</span>}
            </span>
        </div>
    );
};
