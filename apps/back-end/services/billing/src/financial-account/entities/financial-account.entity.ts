import {
  ObjectType,
  Field,
  ID,
  Directive,
  registerEnumType,
} from '@nestjs/graphql';
import { FinancialAccountType } from '@prisma-client';

registerEnumType(FinancialAccountType, { name: 'FinancialAccountType' });

@ObjectType()
@Directive('@key(fields:"id")')
export class FinancialAccount {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String)
  financialId: string;

  @Field(() => String)
  label: string;

  @Field(() => FinancialAccountType)
  type: FinancialAccountType;
}
