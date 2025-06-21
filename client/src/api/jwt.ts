import { jwtDecode } from "jwt-decode"; // Import the named export
import type { TLoginUserJWT } from "../types/UserType";

export const decodeToken = (token: string): TLoginUserJWT | null => {
  return token ? jwtDecode<TLoginUserJWT>(token) : null;
};

export const isTokenValid = (token: TLoginUserJWT | null): boolean => {
  if (!token || !token.exp) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp > currentTime;
};
