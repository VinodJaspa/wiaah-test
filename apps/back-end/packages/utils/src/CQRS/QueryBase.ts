// import { GqlSelectedFields, UserPreferedLang } from "nest-utils";

export class QueryBase<TInput extends Object, TFields extends any> {
  constructor(
    public readonly args: TInput & {
      langId: string;
      selectedFields: TFields;
    }
  ) {}
}
