import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { ClipboardMinus, Package, Warehouse } from "lucide-react";

export const adminMenuItems = [
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
                label: "Create Branch Manager",
                path: "create-branch-manager",
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
                label: "Stock Manage",
                icon: <Warehouse size={15} />,
                children: [
                    {
                        label: "Stock List",
                        path: "stock-list",
                        icon: <GoDotFill />,
                    },
                    {
                        label: "Add Stock",
                        path: "add-stock",
                        icon: <GoDotFill />,
                    },
                    {
                        label: "Adjust Stock",
                        path: "adjust-stock",
                        icon: <GoDotFill />,
                    },
                    {
                        label: "Stock Transfer",
                        path: "stock-transfer",
                        icon: <GoDotFill />,
                    },
                ],
            },
            {
                label: "Product Manage",
                icon: <Package size={15} />,
                children: [
                    {
                        label: "Products",
                        path: "products",
                        icon: <GoDotFill />,
                    },
                    {
                        label: "Categories",
                        path: "categories",
                        icon: <GoDotFill />,
                    },
                    {
                        label: "Create Product",
                        path: "create-product",
                        icon: <GoDotFill />,
                    },
                ],
            },
        ],
    },
    {
        label: "History",
        icon: <ClipboardMinus size={15} />,
        children: [
            {
                label: "Add History",
                path: "add-history",
                icon: <GoDotFill />,
            },
            {
                label: "Adjust History",
                path: "adjust-history",
                icon: <GoDotFill />,
            },
            {
                label: "Transfer History",
                path: "transfer-history",
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
    {
        label: "Branch Management",
        icon: <FaMapLocationDot />,
        children: [
            {
                label: "Branches",
                path: "branches",
                icon: <GoDotFill />,
            },
            {
                label: "Add Branch",
                path: "add-branch",
                icon: <GoDotFill />,
            },
        ],
    },
];
