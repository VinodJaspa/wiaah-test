import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AccountType, AuthorizationDecodedUser } from "../types";
import { Reflector } from "@nestjs/core";

@Injectable()
export class GqlAuthorizationGuard implements CanActivate {
  roles: string[] = [];
  constructor(roles: AccountType[], private readonly reflector?: Reflector) {
    this.roles = [...roles];
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user: AuthorizationDecodedUser = ctx.getContext().user;
    const isPublic = this.reflector.get<boolean>("isPublic", ctx.getHandler());
    const admin = this.reflector.get<string>("admin", ctx.getHandler());
    const seller = this.reflector.get<string>("seller", ctx.getHandler());
    const buyer = this.reflector.get<string>("buyer", ctx.getHandler());

    const roles = [admin, seller, buyer].filter((v) => typeof v === "string");

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
      if (roles.length === 0) return true;
      if (!user.accountType || !roles.includes(user.accountType)) {
        throw new UnauthorizedException(
          "this account can not preform this action"
        );
      }
    }

    return !!user;
  }
}

export const Public = () => SetMetadata("isPublic", true);
export const Admin = () => SetMetadata("admin", "admin");
export const Seller = () => SetMetadata("seller", "seller");
export const Buyer = () => SetMetadata("buyer", "buyer");
