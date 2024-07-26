import MainLayout from "@/layouts/MainLayout";
import LogIn from "@/pages/auth/LogIn";
import NotFound from "@/pages/others/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import RoleBasedRoutes from "./RoleBasedRoutes";
import ChangePassword from "@/pages/auth/ChangePassword";
import Home from "@/pages/Home";

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
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
