import CreatreProduct from "@/pages/products/CreatreProduct";
import Products from "@/pages/products/Products";
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
    
];
