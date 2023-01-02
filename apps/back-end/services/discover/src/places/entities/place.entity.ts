import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id, type")')
export class Place {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;
}

export class PlaceSuggestions {
  @Field(() => [Place])
  places: Place[];
}
