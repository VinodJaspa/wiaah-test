// import { GqlSelectedFields, UserPreferedLang } from "nest-utils";

export class CommandBase<TInput extends Object, TFields extends any> {
  constructor(
    public args: TInput & { langId: string; selectedFields: TFields }
  ) {}
}
