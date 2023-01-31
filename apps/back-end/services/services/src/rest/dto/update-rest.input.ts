import { CreateRestInput } from './create-rest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestInput extends PartialType(CreateRestInput) {
  @Field(() => Int)
  id: number;
}
