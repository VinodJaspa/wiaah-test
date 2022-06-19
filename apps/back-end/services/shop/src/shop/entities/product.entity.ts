import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shop } from './shop.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
export class Product {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => Shop)
  shop?: Shop;
}
