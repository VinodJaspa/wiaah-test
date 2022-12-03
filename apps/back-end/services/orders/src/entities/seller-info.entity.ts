import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from './extends';

@ObjectType()
export class SellerInfo {
  @Field((type) => ID)
  id: string;

  @Field(() => Account, { nullable: true })
  user?: Account;

  @Field((type) => ID)
  shopId: string;
}
