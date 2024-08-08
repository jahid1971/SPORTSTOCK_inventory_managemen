import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { ClipboardMinus, KeyRound, Package, Warehouse } from "lucide-react";

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
                label: "Products",
                path: "products",
                icon: <Package size={15} />,
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
        label: "Change Password",
        icon: <KeyRound size={15} />,
        path: "change-password",
    },
];
