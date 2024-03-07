import { cn } from "@/lib/utils";
// import { useAppDispatch } from "@/redux/Hooks";
// import { logOut } from "@/redux/features/auth/authSlice";
// import { TSidebarItemsProps } from "@/types/Sidebar.types";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useAppDispatch } from "@/redux/Hooks";
import { logOut } from "@/redux/features/auth/authSlice";

function Header({ setOpen, open }) {
    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        dispatch(logOut());
    };

    return (
        <div className=" fixed left-0 right-0 top-0 z-20  bg-primary text-white  ">
            <nav className="flex h-14 items-center justify-between px-5 ">
                <div className={cn("block md:!hidden")}>
                    <HiOutlineBars3 onClick={() => setOpen(!open)} className="h-5 w-5 cursor-pointer md:hidden " />
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        asChild
                        size={"icon"}
                        variant={"ghost"}
                        className="md:hidden hover:bg-primary-400"
                        onClick={() => setOpen && setOpen(!open)}>
                        <HiOutlineBars3 className="h-5 w-5 " />
                    </Button>

                    <NavLink to="/">
                        <h4 className=" font-medium">
                            <span className="text-primary-400 font-bold">SPORT </span>STOCK
                        </h4>
                    </NavLink>
                </div>

                <Button onClick={handleSignOut} variant={"ghost"} className="text-base">
                    Sign out
                </Button>
            </nav>
        </div>
    );
}
export default Header;
