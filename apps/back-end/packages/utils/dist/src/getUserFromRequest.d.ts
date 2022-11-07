import { AuthorizationDecodedUser } from "./types";
export declare function getUserFromRequest<T = AuthorizationDecodedUser>(req: any): T;
export declare function VerifyAndGetUserFromContext(ctx: any): (AuthorizationDecodedUser & {
    token: string;
}) | null;
