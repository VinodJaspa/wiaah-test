import { UserPreferedLang } from "../decorators";
import { GqlSelectedFields } from "../pipes";

// Define a type for the arguments including the required properties
type QueryBaseArgs<TInput, TFields> = TInput & {
  langId: UserPreferedLang;
  selectedFields: TFields;
};

// Define the QueryBase class with generic types
export class QueryBase<
  TInput extends Object,
  TFields extends GqlSelectedFields<any, any>
> {
  constructor(public readonly args: QueryBaseArgs<TInput, TFields>) { }
}
