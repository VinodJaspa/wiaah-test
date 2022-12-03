import { Info } from "@nestjs/graphql";
import { GqlSelectedQueryPipe } from "../../pipes/GqlSelectedQueryPipe";

export const GqlSelectedQueryFields = (options?: {
  rootFieldName?: string;
  selectField?: boolean;
}) =>
  Info(new GqlSelectedQueryPipe(options?.rootFieldName, options?.selectField));
