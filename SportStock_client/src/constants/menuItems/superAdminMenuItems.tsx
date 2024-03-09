import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export const adminMenuItems = [
    {
        label: "Dashboard",
        path: "",
        icon: <RxDashboard />,
    },
    {
        label: "Inventory",
        icon: <MdOutlineInventory2 />,
        children: [
            {
                label: "Products",
                path: "products",
                icon:<GoDotFill />
            },
            {
                label: "Create Product",
                path: "create-product",
                icon:<GoDotFill />
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
                icon:<GoDotFill />
            },
            {
                label: "Create User",
                path: "create-user",
                icon:<GoDotFill />
            },
        ],
    },
];
