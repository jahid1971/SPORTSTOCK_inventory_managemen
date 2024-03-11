import MainLayout from "@/layouts/MainLayout";
import LogIn from "@/pages/auth/LogIn";
import RegisterSeller from "@/pages/auth/RegisterSeller";
import NotFound from "@/pages/others/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { userRole } from "@/constants/user";
import { adminRoutes } from "./adminRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoutes role={userRole.SUPER_ADMIN}>
                <MainLayout />
            </ProtectedRoutes>
        ),
        children: adminRoutes,
    },
    {
        path: "/register-seller",
        element: <RegisterSeller />,
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "*",
        errorElement: <NotFound />,
    },
]);

export default router;
