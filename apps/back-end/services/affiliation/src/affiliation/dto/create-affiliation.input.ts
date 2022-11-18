import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class CreateAffiliationInput {
  @Field(() => ID)
  itemId: string;

  @Field(() => String)
  itemType: string;

  @Field(() => Float)
  commision: number;

  @Field(() => Int)
  validFor: number;
}
