import type { TLoginUserJWT, UserType } from "../types/UserType";
import { JWT_TOKEN } from "../util/Constants";
import { decodeToken, isTokenValid } from "./jwt";

export const setLocalstorage = (token: string): void => {
  localStorage.setItem(JWT_TOKEN, token);
};

export const getLocalStorage = (
  key: string
): { token: string; user: UserType | null } => {
  const token = localStorage.getItem(key) ?? "";
  const parsed: TLoginUserJWT = decodeToken(
    token.length > 0 ? JSON.parse(token) : ""
  );
  const isValid = isTokenValid(parsed);
  if (!isValid) return { token: "", user: null };
  const { exp, iat, ...user } = parsed;
  return { token, user: user };
};
