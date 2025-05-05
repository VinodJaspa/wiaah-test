import { CreateServicePostInput } from './create-service-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServicePostInput extends PartialType(
  CreateServicePostInput,
) {
  @Field(() => Int)
  id: number;
}
