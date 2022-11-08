import { AuthorizationDecodedUser } from "./types";
export declare function getUserFromRequest<T = AuthorizationDecodedUser>(req: any, mock?: boolean, _mockedUser?: AuthorizationDecodedUser): T;
export declare function VerifyAndGetUserFromContext(ctx: any): (AuthorizationDecodedUser & {
    token: string;
}) | null;
