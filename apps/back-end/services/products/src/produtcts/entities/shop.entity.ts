import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Produtct } from './produtct.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Shop {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Produtct])
  products?: Produtct[];
}
