import { ReactNode } from "react";

export type TSidebarItem = {
    label: string;
    path: string;
    children?: TSidebarItem[];
};

export type TRoutes = {
    path: string;
    element: ReactNode;
};

export type TUserMenuItems = {
    label: string;
    path?: string;
    icon?: ReactNode;
    children?: TUserMenuItems[];
};

export type TSidebarItemsProps = {
    mobileMenuOpen?: boolean;
    setMobileMenuOpen?: (open: boolean) => void;
    desktopSidebarOpen: boolean;
};
