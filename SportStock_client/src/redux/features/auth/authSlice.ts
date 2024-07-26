import { RootState } from "@/redux/Store";
import { TUser } from "@/types/global.types";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user: null | TUser;
    token: null | string;
    authLoading: boolean;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    authLoading: true,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.authLoading = false;
        },
        nullifyState: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, nullifyState } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state?.auth?.user;
export const selectAuthLoading = (state: RootState) => state.auth.authLoading;
