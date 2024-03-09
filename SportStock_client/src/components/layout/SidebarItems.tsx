import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { managerMenuItems } from "@/constants/menuItems/branchManagerMenuItems";
import { sellerMenuItems } from "@/constants/menuItems/sellerMenuItems";
import { adminMenuItems } from "@/constants/menuItems/superAdminMenuItems";
import { userRole } from "@/constants/user";
import { useAppSelector } from "@/redux/Hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { TSidebarItemsProps, TUserMenuItems } from "@/types/sidebar.types";
import { TUser, TUserRole } from "@/types/global.types";
import { verifyTYoken } from "@/utls/verifyToken";
import { NavLink } from "react-router-dom";

const SidebarItems = ({ mobileMenuOpen, setMobileMenuOpen, desktopSidebarOpen }: TSidebarItemsProps) => {
    const token = useAppSelector(useCurrentToken);
    let user;
    if (token) user = verifyTYoken(token);

    let userMenuItems: TUserMenuItems[] = [];
    let currentUserRole: TUserRole;
    console.log(token, user, "user");

    switch ((user as TUser)?.role) {
        case userRole.SUPER_ADMIN:
            userMenuItems = adminMenuItems;
            currentUserRole = userRole.SUPER_ADMIN as TUserRole;
            break;
        case userRole.SELLER:
            userMenuItems = sellerMenuItems;
            currentUserRole = userRole.SELLER as TUserRole;
            break;
        case userRole.BRANCH_MANAGER:
            userMenuItems = managerMenuItems;
            currentUserRole = userRole.BRANCH_MANAGER as TUserRole;
            break;
        default:
            break;
    }

    function renderMenuItems(item, childLevel) {
        const paddingLeft = childLevel !== 0 ? `${childLevel * 35}px` : undefined;

        return !item?.children ? (
            <NavLink
                to={`${item.path ? `/${item.path}` : ``}`}
                className={({ isActive }) =>
                    `${
                        isActive && `bg-primary-100 text-primary`
                    } px-2 py-2 hover:bg-primary-100/70 hover:text-primary ${
                        !desktopSidebarOpen && `lg:!pl-2`
                    }`
                }
                style={{ paddingLeft }}
                key={item.label}
                onClick={() => mobileMenuOpen && setMobileMenuOpen && setMobileMenuOpen(false)}>
                <div className="flex gap-[6px] items-center">
                    {item.icon}
                    <h3 className={`${!desktopSidebarOpen && "lg:hidden"} `}>{item.label}</h3>
                </div>
            </NavLink>
        ) : (
            <Accordion type="single" collapsible key={item.label}>
                <AccordionItem className="border-0 " value={item.label}>
                    <AccordionTrigger
                        noIcon={desktopSidebarOpen ? false : true}
                        style={{ paddingLeft }}
                        className="px-2 py-2 [&[data-state=open]]:text-primary  hover:bg-primary-100/70 hover:text-primary/90">
                        <div className="flex gap-[6px] items-center">
                            {item.icon}
                            <h3 className={`${!desktopSidebarOpen && "lg:hidden"} `}>{item.label}</h3>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col pb-0 space-y-1 mt-1">
                        {item?.children?.map(
                            (child) => child.label && renderMenuItems(child, childLevel + 1)
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return <>{userMenuItems.map((item) => renderMenuItems(item, 0))}</>;
};
export default SidebarItems;
