import { GoDotFill } from "react-icons/go";
import { adminMenuItems } from "./adminMenuItems"; 

export const superAdminMenuItems = adminMenuItems.map((item) => {
    if (item.label === "User Management") {
        return {
            ...item,
            children: [
                ...(item.children || []),
                {
                    label: "Create Admin",
                    path: "create-admin",
                    icon: <GoDotFill />,
                },
            ],
        };
    }
    return item;
});
