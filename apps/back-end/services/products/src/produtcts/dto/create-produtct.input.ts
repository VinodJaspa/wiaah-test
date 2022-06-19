import {
  InputType,
  Int,
  Field,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CashbackType, PresentationType } from '@prisma-client';

registerEnumType(PresentationType, { name: 'PresentationType' });
registerEnumType(CashbackType, { name: 'CashbackType' });

@InputType()
export class ProductPresentationInput {
  @Field((type) => PresentationType)
  type: PresentationType;

  @Field((type) => String)
  src: string;
}

@InputType()
export class CashBackInput {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => CashbackType)
  type: CashbackType;
}

@InputType()
export class DiscountInput {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;
}

@InputType()
export class CreateProdutctInput {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field((type) => String)
  category: string;

  @Field((type) => [String])
  colors: string[];

  @Field((type) => [String])
  sizes: string[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => DiscountInput)
  discount: DiscountInput;

  @Field((type) => CashBackInput)
  cashback: CashBackInput;

  @Field((type) => [ProductPresentationInput])
  presentations: ProductPresentationInput[];
}
