import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class MembershipIncludedItem {
  @Field(() => String)
  title: string;
}

@ObjectType()
export class Membership {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => [MembershipIncludedItem])
  includings: MembershipIncludedItem[];
}
