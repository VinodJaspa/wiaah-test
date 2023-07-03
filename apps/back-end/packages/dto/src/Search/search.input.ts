import {
  Int,
  Field,
  InputType,
  Float,
  registerEnumType,
} from "@nestjs/graphql";
import { ExtendableGqlPaginationInput } from "nest-utils";

enum StockStatusFilter {
  "available",
  "unavailable",
}

enum ShippingMothedsFilter {
  "click_and_collect",
  "free",
  "international",
}
registerEnumType(ShippingMothedsFilter, { name: "ShippingMothedsFilter" });
registerEnumType(StockStatusFilter, { name: "StockStatusFilter" });

@InputType()
export class PriceRangeInput {
  @Field((type) => Float)
  min: number;

  @Field((type) => Float)
  max: number;
}

@InputType()
class SearchInput {
  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => [String], { nullable: true })
  categories?: string[];

  @Field((type) => PriceRangeInput, { nullable: true })
  price?: PriceRangeInput;

  @Field((type) => [ShippingMothedsFilter], { nullable: true })
  shippingMotheds?: ShippingMothedsFilter;

  @Field((type) => [String], { nullable: true })
  brands?: string[];

  @Field((type) => [Int], { nullable: true })
  rating?: number[];

  @Field((type) => [String], { nullable: true })
  colors?: string[];

  @Field((type) => [String], { nullable: true })
  size?: string[];

  @Field((type) => String, { nullable: true })
  stockStatus?: keyof typeof StockStatusFilter;

  @Field((type) => [String], { nullable: true })
  countries?: string[];

  @Field((type) => [String], { nullable: true })
  cities?: string[];
}

@InputType()
export class ProductSearchPaginationInput extends ExtendableGqlPaginationInput {
  @Field(() => SearchInput)
  filters: SearchInput;
}
