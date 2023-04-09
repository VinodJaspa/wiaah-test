import { CreateServiceOwnershipInput } from './create-service-ownership.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceOwnershipInput extends PartialType(CreateServiceOwnershipInput) {
  @Field(() => Int)
  id: number;
}
