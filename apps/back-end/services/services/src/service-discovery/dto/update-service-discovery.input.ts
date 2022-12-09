import { CreateServiceDiscoveryInput } from './create-service-discovery.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceDiscoveryInput extends PartialType(CreateServiceDiscoveryInput) {
  @Field(() => Int)
  id: number;
}
