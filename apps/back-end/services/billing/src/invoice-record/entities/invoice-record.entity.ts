import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { InvoiceRecordTypes } from '@prisma-client';

registerEnumType(InvoiceRecordTypes, { name: 'InvoiceRecordTypes' });

@ObjectType()
export class InvoiceRecord {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  period: string;

  @Field(() => InvoiceRecordTypes)
  type: InvoiceRecordTypes;

  @Field(() => Float)
  total: number;

  @Field(() => Float)
  overdue: number;

  @Field(() => Float)
  paid: number;

  @Field(() => Float)
  unPaid: number;
}
