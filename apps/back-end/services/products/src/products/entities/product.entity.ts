import { ObjectType, Field, Int, ID, Directive, Float } from '@nestjs/graphql';
import { CashbackType, PresentationType } from '@prisma-client';

@ObjectType()
export class ProductPresentation {
  @Field((type) => PresentationType)
  type: PresentationType;

  @Field((type) => String)
  src: string;
}

@ObjectType()
export class CashBack {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => CashbackType)
  type: CashbackType;
}

@ObjectType()
export class Discount {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;
}

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@key(fields: "title")')
@Directive('@key(fields: "storeId")')
export class Product {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field((type) => String)
  storeId: string;

  @Field((type) => String)
  category: string;

  @Field((type) => [String])
  colors: string[];

  @Field((type) => [String])
  sizes: string[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => Discount)
  discount: Discount;

  @Field((type) => CashBack)
  cashback: CashBack;

  @Field((type) => [ProductPresentation])
  presentations: ProductPresentation[];

  @Field((type) => Int)
  rate: number;

  @Field((type) => String)
  brand: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => String)
  visibility: string;
}
