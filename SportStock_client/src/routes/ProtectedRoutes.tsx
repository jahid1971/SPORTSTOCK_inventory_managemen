import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { TUser, logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyTYoken } from "@/utls/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();
    let user;
    if (token) user = verifyTYoken(token);

    if (!token) return <Navigate to="/login" replace={true} />;

    if (role !== undefined && user?.role !== role) {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoutes;
