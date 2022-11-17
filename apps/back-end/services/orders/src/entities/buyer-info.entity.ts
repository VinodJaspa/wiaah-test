import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from './extends';

@ObjectType()
export class BuyerInfo {
  @Field((type) => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  user?: Account;
}
