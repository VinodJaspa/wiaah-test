import { UserPreferedLang } from "../decorators";
import { GqlSelectedFields } from "../pipes";

export class QueryBase<
  TInput extends Object,
  TFields extends GqlSelectedFields<any, any>
> {
  constructor(
    public readonly args: TInput & {
      langId: UserPreferedLang;
      selectedFields: TFields;
    }
  ) {}
}
