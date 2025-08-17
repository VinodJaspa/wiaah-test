import { CreateShopInput } from './create-shop.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserShopInput extends PartialType(CreateShopInput) {
  @Field(() => String)
  ownerId: string;
}
