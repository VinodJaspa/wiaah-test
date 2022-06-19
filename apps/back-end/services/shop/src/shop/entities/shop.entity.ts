import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from './product.entity';
@ObjectType()
export class Location {
  @Field((type) => Int)
  lat: number;

  @Field((type) => Int)
  long: number;

  @Field((type) => String)
  address: string;
}

@ObjectType()
export class Shop {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Location)
  location: Location;

  @Field((type) => String)
  ownerId: string;

  @Field((type) => [Product])
  products: Product[];
}
