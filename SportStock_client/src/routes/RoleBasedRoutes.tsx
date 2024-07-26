import { useAppSelector } from "@/redux/Hooks";

import { Navigate } from "react-router-dom";

import { SellerRoutes } from "./SellerRoutes";
import { userRole } from "@/constants/user";
import { BranchManagerRoutes } from "./BranchManagerRoutes";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { SuperAdminRoutes } from "./SuperAdminRoutes";
import { AdminRoutes } from "./AdminRoutes";

const RoleBasedRoutes = () => {
    const user = useAppSelector(selectCurrentUser);

    if (!user) return <Navigate to="/login" replace={true} />;

    if (user.role === userRole.SUPER_ADMIN) {
        return <SuperAdminRoutes />;
    } else if (user.role === userRole.ADMIN) {
        return <AdminRoutes />;
    } else if (user.role === userRole.SELLER) {
        return <SellerRoutes />;
    } else if (user.role === userRole.BRANCH_MANAGER) {
        return <BranchManagerRoutes />;
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default RoleBasedRoutes;
