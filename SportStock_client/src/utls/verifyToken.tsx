import { jwtDecode } from "jwt-decode";
export const verifyTYoken = (token: string) => {
    return jwtDecode(token);
};
