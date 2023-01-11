import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequiredActionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
