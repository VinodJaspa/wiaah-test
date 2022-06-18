import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class AuthorizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=AuthorizationGuard.d.ts.map
