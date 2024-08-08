import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";

import { ClipboardMinus, KeyRound } from "lucide-react";

export const sellerMenuItems = [
    {
        label: "Dashboard",
        path: "dashboard",
        icon: <RxDashboard />,
    },


    {
        label: "Stock List",
        path: "stock-list",
        icon: <MdOutlineInventory2 />,
    },

    {
        label: "Adjust History",
        path: "adjust-history",
        icon: <ClipboardMinus size={15} />,
    },
    {
        label: "Change Password",
        icon: <KeyRound size={15} />,
        path: "change-password",
    },
];
