import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Hashtag {
  @Field(() => String)
  tag: string;
}
