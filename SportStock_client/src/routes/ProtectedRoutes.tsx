import { LoadingOverlayComponent } from "@/components/table/tableLoader/LoadingOverlay";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { useGetMeQuery } from "@/redux/api/authApi";

import {
    selectAuthLoading,
    selectCurrentUser,
    setUser,
} from "@/redux/features/auth/authSlice";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({
    children,
    role,
}: {
    children: ReactNode;
    role?: string;
}) => {
    const dispatch = useAppDispatch();

    const { data, isLoading }:any = useGetMeQuery(undefined);

    useEffect(() => {
        if (!isLoading && data?.data?.user && data?.data?.token) {
            dispatch(
                setUser({ user: data?.data?.user, token: data?.data?.token })
            );
        }
    }, [isLoading, dispatch, data]);

    const currentUser = useAppSelector(selectCurrentUser);
    const authLoading = useAppSelector(selectAuthLoading);

    if (authLoading || (!currentUser && data)) {
        return (
            <div className=" relative top-48">
                <LoadingOverlayComponent />;
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace={true} />;
    }
    if (role !== undefined && currentUser?.role !== role) {

        return <Navigate to="/login" replace={true} />;
    }

    return children;
};

export default ProtectedRoutes;
