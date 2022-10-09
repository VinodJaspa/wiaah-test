import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shop } from './shop.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "storeId")')
export class Product {
  @Field((type) => String)
  @Directive('@external')
  storeId: string;

  // @Field((type) => Shop)
  // shop: Shop;
}
