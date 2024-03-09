import { cn } from "@/lib/utils";
// import { useAppDispatch } from "@/redux/Hooks";
// import { logOut } from "@/redux/features/auth/authSlice";
// import { TSidebarItemsProps } from "@/types/Sidebar.types";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useAppDispatch } from "@/redux/Hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { TiArrowLeft } from "react-icons/ti";

function Header({ setMobileMenuOpen, mobileMenuOpen, desktopSidebarOpen, setDesktopSidebarOpen }) {
    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        dispatch(logOut());
    };

    return (
        <div className=" w-full  bg-slate-100 shadow-sm  ">
            <nav className="flex h-14 items-center justify-between  ">
                <div className="flex gap-2 items-center">
                    {/* <Button
                        asChild
                        size={"icon"}
                        variant={"ghost"}
                        className="md:hidden hover:bg-primary-400"
                        onClick={() => setOpen && setOpen(!open)}>
                        <HiOutlineBars3 className="h-5 w-5 " />
                    </Button> */}
                    <div className="block md:hidden">
                        <HiOutlineBars3
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-5 w-5 cursor-pointer md:hidden "
                        />
                    </div>
                    <TiArrowLeft
                        onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                        className={`hidden md:block cursor-pointer ${
                            !desktopSidebarOpen ? "rotate-180" : ""
                        }`}
                        size={28}
                    />
                </div>

                <Button onClick={handleSignOut} variant={"ghost"} className="text-base">
                    Sign out
                </Button>
            </nav>
        </div>
    );
}
export default Header;
