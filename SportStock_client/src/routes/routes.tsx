import MainLayout from "@/layouts/MainLayout";
import LogIn from "@/pages/auth/LogIn";
import NotFound from "@/pages/others/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleBasedRoutes from "./RoleBasedRoutes";

import Home from "@/pages/Home";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <MainLayout />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/*",
                element: <RoleBasedRoutes />,
            },
        ],
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
