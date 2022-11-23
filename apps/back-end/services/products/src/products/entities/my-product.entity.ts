import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
export class MyProduct extends Product {
  @Field(() => Float)
  earnings: number;
}
