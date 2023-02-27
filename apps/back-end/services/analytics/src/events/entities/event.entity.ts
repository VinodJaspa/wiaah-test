import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  key: string;

  @Field(() => String)
  causedById: string;

  @Field(() => String, { nullable: true })
  causedToId?: string;
}
