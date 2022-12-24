import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@Directive('@extends')
@Directive('@key(fields:"id")')
@ObjectType()
export class Account {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
