import { CreateServiceFilterInput } from './create-service-filter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceFilterInput extends PartialType(CreateServiceFilterInput) {
  @Field(() => Int)
  id: number;
}
