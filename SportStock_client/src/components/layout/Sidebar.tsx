import { cn } from "@/lib/utils";
import SidebarItems from "./SidebarItems";

import { NavLink } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { TSidebarItemsProps } from "@/types/sidebar.types";

export default function Sidebar({
    mobileMenuOpen,
    setMobileMenuOpen,
    desktopSidebarOpen,
}: TSidebarItemsProps) {
    const logo = (
        <NavLink to="/" className="font-medium ml-4 flex items-center gap-1 ">
            <MdOutlineSportsBaseball className="text-primary text-lg" />
            {(desktopSidebarOpen || mobileMenuOpen) && (
                <h4>
                    <span className="text-primary-400 font-bold">SPORT </span>
                    STOCK
                </h4>
            )}
        </NavLink>
    );

    return (
        <nav
            className={cn(
                `sticky top-0 h-screen hidden   py-5  md:block duration-500 scrollbar  overflow-y-auto overflow-x-auto   shadow-lg`,
                desktopSidebarOpen ? "w-[290px]" : "w-[60px] "
            )}
        >
            {/* desktop sidebar..................................desktop sidebar */}
            {logo}

            <div className="flex flex-col space-y-2 py-4 mt-8 px-2 h-fit ">
                <SidebarItems desktopSidebarOpen={desktopSidebarOpen} />
            </div>

            {/* mobile sidebar..................................mobile sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent className="bg-slate-100 border-0  px-0 ">
                    {logo}

                    <div className="flex flex-col space-y-2 mt-10 pl-2 ">
                        <SidebarItems
                            mobileMenuOpen={mobileMenuOpen}
                            setMobileMenuOpen={setMobileMenuOpen}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
