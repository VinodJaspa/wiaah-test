import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceRecordInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
