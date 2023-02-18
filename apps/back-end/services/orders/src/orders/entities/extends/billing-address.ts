import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"ownerId, id")')
export class BillingAddress {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => ID)
  @Directive('@external')
  ownerId: string;
}
