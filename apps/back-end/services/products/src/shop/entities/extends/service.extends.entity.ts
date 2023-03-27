import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"ownerId")')
export class Service {
  @Field(() => ID)
  @Directive('@external')
  ownerId: string;
}
