import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"code")')
export class Currency {
  @Field(() => String)
  @Directive('@external')
  code: string;
}

@ObjectType()
export class WithdrawCurrency {
  @Field(() => String)
  code: string;
}
