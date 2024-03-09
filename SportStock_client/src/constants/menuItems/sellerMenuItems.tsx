import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";


export const sellerMenuItems = [
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
        ],
    },
];
