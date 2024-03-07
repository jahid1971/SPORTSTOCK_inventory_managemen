
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";


const SidebarItems = ({ open, setOpen, desktopSidebarOpen }: TSidebarItemsProps) => {
    // const token = useAppSelector(useCurrentToken);
    let user;
    // if (token) user = verifyTYoken(token);

    type TUserRole = "admin" | "faculty" | "student";

    const userRole = {
        ADMIN: "admin",
        FACULTY: "faculty",
        STUDENT: "student",
    };

    let userPaths: TUserPath[] = [];
    let currentUserRole: TUserRole;

    switch ((user as TUser )?.role) {
        case userRole.ADMIN:
            userPaths = adminPaths;
            currentUserRole = userRole.ADMIN as TUserRole;
            break;
        case userRole.FACULTY:
            userPaths = facultyPaths;
            currentUserRole = userRole.FACULTY as TUserRole;
            break;
        case userRole.STUDENT:
            userPaths = studentPaths;
            currentUserRole = userRole.STUDENT as TUserRole;
            break;
        default:
            break;
    }

    function renderMenuItems(item, childLevel) {
        const paddingLeft = childLevel !== 0 ? `${childLevel * 35}px` : undefined;

        return !item?.children ? (
            <NavLink
                to={`${item.path ? `/${currentUserRole}/${item.path}` : `/${currentUserRole}`}`}
                className={({ isActive }) =>
                    `${isActive && `bg-primary`} px-2 py-2 hover:bg-primary ${
                        !desktopSidebarOpen && `lg:!pl-2`
                    }`
                }
                style={{ paddingLeft }}
                key={item.label}
                onClick={() => open && setOpen && setOpen(false)}>
                <div className="flex gap-2 items-center">
                    {item.icon}
                    <h3 className={`${!desktopSidebarOpen && "lg:hidden"} `}>{item.label}</h3>
                </div>
            </NavLink>
        ) : (
            <Accordion type="single" collapsible key={item.label}>
                <AccordionItem value={item.label}>
                    <AccordionTrigger
                        noIcon={desktopSidebarOpen ? false : true}
                        style={{ paddingLeft }}
                        className="px-2 py-2 hover:bg-primary">
                        <div className="flex gap-2 items-center">
                            {item.icon}
                            <h3 className={`${!desktopSidebarOpen && "lg:hidden"} `}>{item.label}</h3>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col  space-y-1 mt-1">
                        {item?.children?.map(
                            (child) => child.label && renderMenuItems(child, childLevel + 1)
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return <>{userPaths.map((item) => renderMenuItems(item, 0))}</>;
};
export default SidebarItems;
