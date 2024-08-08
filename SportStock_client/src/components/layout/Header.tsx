// import { useAppDispatch } from "@/redux/Hooks";
// import { logOut } from "@/redux/features/auth/authSlice";
// import { TSidebarItemsProps } from "@/types/Sidebar.types";
import { Button } from "@/components/ui/button";

import { HiOutlineBars3 } from "react-icons/hi2";
import { useAppDispatch, useCurrentUser } from "@/redux/Hooks";

import { TiArrowLeft } from "react-icons/ti";
import {  useLogOutMutation } from "@/redux/api/authApi";
import tryCatch from "@/utls/tryCatch";
import { useNavigate } from "react-router-dom";
import { nullifyState } from "@/redux/features/auth/authSlice";

type THeaderProps = {
    setMobileMenuOpen:  any
    mobileMenuOpen: boolean;
    desktopSidebarOpen: boolean;
    setDesktopSidebarOpen: any
};

function Header({
    setMobileMenuOpen,
    mobileMenuOpen,
    desktopSidebarOpen,
    setDesktopSidebarOpen,
}: THeaderProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useCurrentUser();

    const [signOut] = useLogOutMutation();

    const handleSignOut = () => {
        tryCatch(
            async () => {
                dispatch(nullifyState());
                return signOut({});
            },
            "logged out successfully",
            "log out in process",
            () => navigate("/login")
        );
    };

    return (
        <div className=" w-full  shadow-sm  ">
            <nav className="flex h-14 items-center justify-between  ">
                <div className="flex gap-2 items-center">
                    <div className="block md:hidden pl-5">
                        <HiOutlineBars3
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="h-5 w-5 cursor-pointer md:hidden "
                        />
                    </div>
                    <TiArrowLeft
                        onClick={() =>
                            setDesktopSidebarOpen(!desktopSidebarOpen)
                        }
                        className={`hidden md:block cursor-pointer ${
                            !desktopSidebarOpen ? "rotate-180" : ""
                        }`}
                        size={28}
                    />
                    <h5 className="font-medium  text-slate-600">
                        Welcom Back, {user?.fullName}
                    </h5>
                </div>

                <Button
                    onClick={handleSignOut}
                    variant={"ghost"}
                    className="text-base mr-5"
                >
                    Sign out
                </Button>
            </nav>
        </div>
    );
}
export default Header;
