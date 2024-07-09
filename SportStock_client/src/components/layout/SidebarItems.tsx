/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { sellerMenuItems } from "@/constants/menuItems/sellerMenuItems";
import { adminMenuItems } from "@/constants/menuItems/superAdminMenuItems";
import { userRole } from "@/constants/user";
import { useCurrentUser } from "@/redux/Hooks";
import { TSidebarItemsProps, TUserMenuItems } from "@/types/sidebar.types";
import { TUser } from "@/types/global.types";
import { NavLink } from "react-router-dom";
import { BranchManagerMenuItems } from "@/constants/menuItems/branchManagerMenuItems";

const SidebarItems = ({
    mobileMenuOpen,
    setMobileMenuOpen,
    desktopSidebarOpen,
}: TSidebarItemsProps) => {
    const user = useCurrentUser();

    let userMenuItems: TUserMenuItems[] = [];

    switch ((user as TUser)?.role) {
        case userRole.SUPER_ADMIN:
            userMenuItems = adminMenuItems;
            break;
        case userRole.SELLER:
            userMenuItems = sellerMenuItems;
            break;
        case userRole.BRANCH_MANAGER:
            userMenuItems = BranchManagerMenuItems;
            break;
        default:
            break;
    }

    function renderMenuItems(item: any, childLevel: any) {
        const paddingLeft =
            childLevel !== 0 ? `${childLevel * 35}px` : undefined;

        return !item?.children ? (
            <NavLink
                to={`${item.path ? `/${item.path}` : ``}`}
                className={({ isActive }) =>
                    `${
                        isActive && `bg-primary-100 text-primary`
                    } px-3 py-2 hover:bg-primary-100/70 hover:text-primary ${
                        !desktopSidebarOpen && `!pl-3`
                    }`
                }
                style={{ paddingLeft }}
                key={item.label}
                onClick={() =>
                    mobileMenuOpen &&
                    setMobileMenuOpen &&
                    setMobileMenuOpen(false)
                }
            >
                <div className="flex gap-4 items-center">
                    <span className="text-primary">{item.icon}</span>
                    <h3
                        className={`${
                            !desktopSidebarOpen && "lg:absolute right-24"
                        } `}
                    >
                        {item.label}
                    </h3>
                </div>
            </NavLink>
        ) : (
            <Accordion type="single" collapsible key={item.label}>
                <AccordionItem className="border-0 " value={item.label}>
                    <AccordionTrigger
                        noIcon={desktopSidebarOpen ? false : true}
                        style={{ paddingLeft }}
                        className="px-3 py-2 [&[data-state=open]]:text-primary  hover:bg-primary-100/70 hover:text-primary/90"
                    >
                        <div className="flex gap-4 items-center text-nowrap">
                        <span className="text-primary">{item.icon}</span>
                            <h3
                                className={`${
                                    !desktopSidebarOpen &&
                                    "lg:absolute right-24"
                                } `}
                            >
                                {item.label}
                            </h3>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col pb-0 space-y-1 mt-1">
                        {item?.children?.map(
                            (child: any) =>
                                child.label &&
                                renderMenuItems(child, childLevel + 1)
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return <>{userMenuItems.map((item) => renderMenuItems(item, 0))}</>;
};
export default SidebarItems;
