import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@keys(fields:"id")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
