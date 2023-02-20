import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Membership } from '../membership.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"membershipId, id")')
export class Account {
  @Field(() => ID, { nullable: true })
  @Directive('@external')
  membershipId: string;

  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => Membership, { nullable: true })
  membership?: Membership;
}
