import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
// @Directive('@extends')
// @Directive('@key(fields:"id, type")')
export class Place {
  @Field(() => ID)
  // @Directive('@external')
  id: string;

  @Field(() => String)
  // @Directive('@external')
  type: string;
}

@ObjectType()
export class PlaceSuggestions {
  @Field(() => [Place])
  places: Place[];
}
