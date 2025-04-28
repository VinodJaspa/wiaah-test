// import { GqlSelectedFields, UserPreferedLang } from "nest-utils";

export class CommandBase<TInput extends object, TFields extends any = any> {
  constructor(
    public args: TInput & { langId: string; selectedFields: TFields }
  ) {}
}
