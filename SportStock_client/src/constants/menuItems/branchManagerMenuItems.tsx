import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

export const BranchManagerMenuItems = [
    {
        label: "Dashboard",
        path: "dashboard",
        icon: <RxDashboard />,
    },
    {
        label: "User Management",
        icon: <FaUser />,
        children: [
            {
                label: "Users",
                path: "users",
                icon: <GoDotFill />,
            },
            {
                label: "Create Seller",
                path: "create-seller",
                icon: <GoDotFill />,
            },
        ],
    },
    {
        label: "Inventory",
        icon: <MdOutlineInventory2 />,
        children: [
            {
                label: "Products",
                path: "products",
                icon: <GoDotFill />,
            },
            {
                label: "Create Product",
                path: "create-product",
                icon: <GoDotFill />,
            },
        ],
    },
    {
        label: "Sales",
        icon: <IoCartOutline />,
        children: [
            {
                label: "Sales Report",
                path: "sales-report",
                icon: <GoDotFill />,
            },
            {
                label: "Sales History",
                path: "sales-history",
                icon: <GoDotFill />,
            },
        ],
    },
];