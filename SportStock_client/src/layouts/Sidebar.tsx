import { useState } from "react";
import { cn } from "@/lib/utils";
// import SidebarItems from "./SidebarItems";
import { TSidebarItemsProps } from "@/types/Sidebar.types";
import { NavLink } from "react-router-dom";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { TiArrowLeft } from "react-icons/ti";

export default function Sidebar({ open, setOpen }: TSidebarItemsProps) {
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    return (
        <nav
            className={cn(
                `sticky top-0 h-screen hidden  pt-[85px] pb-5  md:block duration-500 bg-slate-800 text-white overflow-y-scroll overflow-x-auto text-[14px] `,
                desktopSidebarOpen ? "w-[290px]" : "w-[60px] "
            )}
            style={{ scrollbarWidth: "thin" }}>
            <TiArrowLeft
                desktopSidebarOpen={desktopSidebarOpen}
                setDesktopSidebarOpen={setDesktopSidebarOpen}
            />

            <div className="flex flex-col space-y-2 py-4 px-2 h-full ">
                <SidebarItems desktopSidebarOpen={desktopSidebarOpen} />
            </div>

            {/* mobile sidebar..................................mobile sidebar */}
            <SheetClose open={open} onOpenChange={setOpen}>
                <SheetContent className="bg-slate-800 text-white border-0">
                    <NavLink to="/" className="text-base font-medium ml-4">
                        <span className="text-primary-400 font-bold">NETRA </span>UNIVERSITY
                    </NavLink>

                    <div className="flex flex-col space-y-2 mt-10 ">
                        <SidebarItems open={open} setOpen={setOpen} />
                    </div>
                </SheetContent>
            </SheetClose>
        </nav>
    );
}
