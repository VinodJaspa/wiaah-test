import jwtDecode from "jwt-decode";

interface AuthTokenPayload {
  userId?: string;
  sub?: string;
  email?: string;
  [key: string]: any;
}

export const getUserIdFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="));
  if (!cookie) return null;

  const token = cookie.split("=")[1];
  if (!token) return null;

  try {
    const decoded: AuthTokenPayload = jwtDecode(token);
    console.log(decoded ,"decoded");
    
    return decoded.userId || decoded.sub || null;
  } catch (err) {
    console.error("Failed to decode auth_token", err);
    return null;
  }
};
