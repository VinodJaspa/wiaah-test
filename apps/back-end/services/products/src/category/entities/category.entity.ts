import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  parantId: string;
}
