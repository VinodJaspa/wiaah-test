import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class HiddenContent {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ID)
  userId: string;
}
