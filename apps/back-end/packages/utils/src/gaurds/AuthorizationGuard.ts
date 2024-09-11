import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AccountType, AuthorizationDecodedUser } from "../types";
import { accountType } from "../constants";
import { KnownError, PublicErrorCodes } from "../Errors/knownError";

class AuthorizationRequired extends KnownError {
  constructor(msg: string) {
    super(msg, PublicErrorCodes.unAuthorized);
  }
}

class PremissionDenied extends KnownError {
  constructor(msg: string) {
    super(msg, PublicErrorCodes.premissionDenied);
  }
}

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

    const isPublic = this.roles.includes(accountType.SELLER);

    if (!user || typeof user !== "object" || typeof user.id !== "string") {
      if (isPublic) {
        return true;
      } else {
        throw new AuthorizationRequired(
          "you need to sign in to preform this action"
        );
      }
    }

    if (this.roles) {
      if (this.roles.length === 0) return true;
      if (!user.accountType || !this.roles.includes(user.accountType)) {
        throw new PremissionDenied("this account can not preform this action");
      }
    } else {
      return false;
    }

    return !!user;
  }
}
