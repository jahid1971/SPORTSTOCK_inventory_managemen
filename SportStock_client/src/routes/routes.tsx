import MainLayout from "@/layouts/MainLayout";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <LogIn />,
    },
])

export default router;