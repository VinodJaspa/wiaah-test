import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountType } from "../types";
export declare class GqlAuthorizationGuard implements CanActivate {
    roles: string[];
    constructor(roles: AccountType[]);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
