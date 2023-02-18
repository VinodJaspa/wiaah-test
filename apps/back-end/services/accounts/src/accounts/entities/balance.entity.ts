import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"ownerId")')
export class Balance {
  @Field(() => ID)
  @Directive('@external')
  ownerId: string;
}
