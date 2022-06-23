import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@ObjectType()
class Filter {
  @Field((type) => String)
  title: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "filter")')
export class Search {
  @Field((type) => String)
  @Directive('@external')
  filter: string;

  @Field((type) => [Product])
  products: Product[];
}
