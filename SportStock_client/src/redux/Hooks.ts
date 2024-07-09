import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./Store";
import { useMemo } from "react";
import { verifyToken } from "@/utls/verifyToken";
import { selectCurrentToken } from "./features/auth/authSlice";
import { TUser } from "@/types/global.types";
import { JwtPayload } from "jwt-decode";

// Use throughout  app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TDecodedUser = (JwtPayload & TUser) | null;

export const useCurrentUser: () => TDecodedUser = () => {
    const token = useAppSelector(selectCurrentToken);

    const user: TDecodedUser = useMemo<TDecodedUser | null>(() => {
        if (token) {
            return verifyToken(token) as TDecodedUser;
        }
        return null;
    }, [token]);

    return user ;
};
