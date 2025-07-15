import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  names: string;
  email: string;
  phone_number: string;
  exp: number; // JWT expiration time
  iat?: number; // JWT issued at time (optional)
}

export const tokenDecoder = (): DecodedToken | null => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
};
