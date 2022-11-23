import { CreatePostInput } from '@input';
import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAffiliationPostInput {
  @Field(() => ID)
  affiliationId: string;
}
