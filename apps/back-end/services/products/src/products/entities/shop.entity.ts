import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "name")')
export class Shop {
  @Field((type) => String)
  @Directive('@external')
  name: string;

  @Field((type) => [Product])
  products?: Product[];
}
