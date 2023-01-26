import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAffiliationPostInput {
  @Field(() => String)
  id: string;
}
