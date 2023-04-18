import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from "@nestjs/common";
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

    // return true;
    console.log("user", { user });

    const isPublic = this.roles.includes(accountType.PUBLIC);

    if (!user || typeof user !== "object" || typeof user.id !== "string") {
      if (isPublic) {
        return true;
      } else {
        throw new AuthorizationRequired(
          "this account can not preform this actionawjdhkja"
        );
      }
    }

    if (this.roles) {
      if (this.roles.length === 0) return true;
      if (!user.accountType || !this.roles.includes(user.accountType)) {
        throw new AuthorizationRequired(
          "this account can not preform this action1324654"
        );
      }
    } else {
      return false;
    }

    console.log("checking with user");

    return !!user;
  }
}
