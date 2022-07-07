import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePartnerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
