import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class MembershipIncludedItemInput {
  @Field(() => String)
  title: string;
}

@InputType()
export class CreateMembershipInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => [MembershipIncludedItemInput])
  includings: MembershipIncludedItemInput;
}
