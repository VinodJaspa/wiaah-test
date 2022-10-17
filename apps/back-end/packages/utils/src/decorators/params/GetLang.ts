import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

export type UserPreferedLang = string;

export const GetLang = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctxType = context.getType<GqlContextType>();
    let req: any;

    if (ctxType === "http") {
      req = context.switchToHttp().getRequest();
    } else if (ctxType === "graphql") {
      req = GqlExecutionContext.create(context).getContext().req;
    } else return null;

    const langHeader = req?.headers["accept-language"];
    if (typeof langHeader !== "string") return "en";
    return langHeader;
  }
);
