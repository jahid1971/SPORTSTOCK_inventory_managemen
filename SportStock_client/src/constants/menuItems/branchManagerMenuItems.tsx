import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export const managerMenuItems = [
    {
        label: "Dashboard",
        path: "dashboard",
        icon: <RxDashboard />,
    },
    {
        label: "Inventory",
        icon: <MdOutlineInventory2 />,
        children: [
            {
                label: "Products",
                path: "products",
            },
            {
                label: "Create Product",
                path: "create-product",
            },
        ],
    },
    {
        label: "User Management",
        icon: <FaUser />,
        children: [
            {
                label: "Users",
                path: "users",
            },
            {
                label: "Create User",
                path: "create-user",
            },
        ],
    },
];
