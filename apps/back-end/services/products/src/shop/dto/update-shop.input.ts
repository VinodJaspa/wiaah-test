import { CreateShopInput } from './create-shop.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShopInput extends PartialType(CreateShopInput) {}
