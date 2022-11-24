import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthOtpInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
