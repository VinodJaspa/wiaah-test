import { CreateSearchShopInput } from './create-search-shop.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSearchShopInput extends PartialType(CreateSearchShopInput) {
  @Field(() => Int)
  id: number;
}
