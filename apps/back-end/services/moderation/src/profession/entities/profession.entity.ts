import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id")')
export class Profession {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  usage: number;

  @Field(() => Int)
  sortOrder: number;
}
