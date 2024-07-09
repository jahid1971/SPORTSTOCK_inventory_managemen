import { RxDashboard } from "react-icons/rx";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoDotFill } from "react-icons/go";


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
                icon: <GoDotFill />,
            }
        ],
    },
    // {
    //     label: "Sales",
    //     icon: <IoCartOutline />,
    //     children: [
    //         {
    //             label: "Sales Report",
    //             path: "sales-report",
    //             icon: <GoDotFill />,
    //         },
    //         {
    //             label: "Sales History",
    //             path: "sales-history",
    //             icon: <GoDotFill />,
    //         },
    //     ],
    // },
];
