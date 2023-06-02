import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SavesCollection {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
