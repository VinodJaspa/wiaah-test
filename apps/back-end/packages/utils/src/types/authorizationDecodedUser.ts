export interface AuthorizationDecodedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}
