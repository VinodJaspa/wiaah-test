import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GqlCurrentUser = createParamDecorator(
  (data: { required?: boolean }, context: ExecutionContext) => {
    const required = !!data?.required;

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user;
    if (required && !user)
      throw new UnauthorizedException("you must be logined to do this action");
    return;
  }
);
