import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountType } from "../types";
export declare class GqlAuthorizationGuard implements CanActivate {
  private roles;
  constructor(roles: AccountType[]);
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=AuthorizationGuard.d.ts.map
