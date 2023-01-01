import { CreateInvoiceRecordInput } from './create-invoice-record.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceRecordInput extends PartialType(CreateInvoiceRecordInput) {
  @Field(() => Int)
  id: number;
}
