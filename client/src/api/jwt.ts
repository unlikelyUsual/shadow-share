import { jwtDecode } from "jwt-decode"; // Import the named export

interface JwtPayload {
  name: string;
  email: string;
  id: string;
  role: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
