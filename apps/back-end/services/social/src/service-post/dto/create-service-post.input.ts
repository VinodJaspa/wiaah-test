import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServicePostInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
