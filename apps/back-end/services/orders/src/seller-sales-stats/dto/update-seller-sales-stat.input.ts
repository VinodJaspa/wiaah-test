import { CreateSellerSalesStatInput } from './create-seller-sales-stat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSellerSalesStatInput extends PartialType(
  CreateSellerSalesStatInput,
) {
  @Field(() => Int)
  id: number;
}
