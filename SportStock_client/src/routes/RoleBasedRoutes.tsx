import { useAppSelector } from "@/redux/Hooks";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/global.types";
import { verifyToken } from "@/utls/verifyToken";
import { Navigate } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { SellerRoutes } from "./SellerRoutes";
import { userRole } from "@/constants/user";
import { BranchManagerRoutes } from "./BranchManagerRoutes";

const RoleBasedRoutes = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) user = verifyToken(token) as TUser | undefined;

    if (!user) return <Navigate to="/login" replace={true} />;
  

    if (user.role === userRole.SUPER_ADMIN) {
        return <AdminRoutes />;
    } else if (user.role === userRole.SELLER) {
        return <SellerRoutes />;
    } 
    
    else if( user.role === userRole.BRANCH_MANAGER){
        return <BranchManagerRoutes />;
    }
         else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default RoleBasedRoutes;
