import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBuyerOrderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
