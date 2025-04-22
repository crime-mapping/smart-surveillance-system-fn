import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  names: string;
  email: string;
  phone_number: string;
}

export const tokenDecoder = (): DecodedToken | null => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
};
