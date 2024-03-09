import { RootState } from "@/redux/Store";
import { TUser } from "@/types/global.types";
import { createSlice } from "@reduxjs/toolkit";


type TAuthState = {
    user: null | TUser;
    token: null | string;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            console.log(action.payload, "action.payload")
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
