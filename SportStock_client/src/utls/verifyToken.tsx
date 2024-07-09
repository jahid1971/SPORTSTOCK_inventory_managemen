import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error('Token decoding failed', err);
    return null;
  }
};






