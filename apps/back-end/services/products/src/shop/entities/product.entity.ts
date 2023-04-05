import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shop } from './shop.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Product {
  @Field((type) => String)
  @Directive('@external')
  id: string;
}
