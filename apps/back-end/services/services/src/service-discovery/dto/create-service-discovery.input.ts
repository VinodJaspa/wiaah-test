import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceDiscoveryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
