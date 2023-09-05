import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSellerSalesStatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
