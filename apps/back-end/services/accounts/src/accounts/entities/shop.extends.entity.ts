import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"ownerId")')
export class Shop {
  @Field(() => String)
  @Directive('@external')
  ownerId: string;
}
