import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"sellerId")')
export class Service {
  @Field(() => ID)
  @Directive('@external')
  sellerId: string;
}
