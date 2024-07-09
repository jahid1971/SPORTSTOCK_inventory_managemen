import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { logOut, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/global.types";
import { verifyToken } from "@/utls/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }: { children: ReactNode; role?: string }) => {
    const token = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    let user;
    if (token) user = verifyToken(token) as TUser | undefined;

    if (!token) return <Navigate to="/login" replace={true} />;

    if (role !== undefined && user?.role !== role) {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoutes;
