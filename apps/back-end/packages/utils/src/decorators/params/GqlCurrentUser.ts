import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GqlCurrentUser = createParamDecorator(
  ({ required = false }: { required?: boolean }, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user;
    if (required && !user)
      throw new UnauthorizedException("you must be logined to do this action");
    return;
  }
);
