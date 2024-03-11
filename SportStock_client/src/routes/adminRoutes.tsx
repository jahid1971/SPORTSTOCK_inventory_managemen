import CreatreProduct from "@/pages/products/CreatreProduct";
import Users from "@/pages/shared/Users";


export const adminRoutes = [
    {
        path: "users",
        element: <Users />,
    },
    {
        path:"/create-product",
        element: <CreatreProduct />
    },
]