import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"tag")')
@Directive('@key(fields:"id")')
export class Hashtag {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  tag: string;

  @Field(() => Int)
  usage: number;

  @Field(() => String)
  createdById: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
