import CreatreProduct from "@/pages/products/CreatreProduct";
import Products from "@/pages/products/Products";
import SalesHistory from "@/pages/sales/SalesHistory";
import SalesReport from "@/pages/sales/SalesReport";
import Users from "@/pages/Users";

export const adminRoutes = [
    {
        path: "users",
        element: <Users />,
    },
    {
        path: "/create-product",
        element: <CreatreProduct />,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/sales-report",
        element: <SalesReport />,
    },
    {
        path: "/sales-history",
        element: <SalesHistory />,
    },
];
