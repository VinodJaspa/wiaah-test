import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Shop {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Product])
  products?: Product[];
}
