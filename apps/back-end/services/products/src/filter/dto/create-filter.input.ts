import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ProductFilterGroupValueInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class CreateFilterInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ProductFilterGroupValueInput])
  values: ProductFilterGroupValueInput[];
}
