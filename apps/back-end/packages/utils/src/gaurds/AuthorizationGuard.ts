import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AccountType, AuthorizationDecodedUser } from "../types";
import { accountType } from "../constants";

@Injectable()
export class GqlAuthorizationGuard implements CanActivate {
  roles: string[] = [];
  constructor(roles: AccountType[]) {
    this.roles = [...roles];
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user: AuthorizationDecodedUser = ctx.getContext().user;

    const isPublic = this.roles.includes(accountType.PUBLIC);

    if (!user || typeof user !== "object" || typeof user.id !== "string") {
      if (isPublic) {
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }

    if (this.roles) {
      if (this.roles.length === 0) return true;
      if (!user.accountType || !this.roles.includes(user.accountType)) {
        throw new UnauthorizedException(
          "this account can not preform this action"
        );
      }
    } else {
      return false;
    }

    return !!user;
  }
}
