import { CreateAffiliationPostInput } from './create-affiliation-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAffiliationPostInput extends PartialType(
  CreateAffiliationPostInput,
) {
  @Field(() => Int)
  id: number;
}
