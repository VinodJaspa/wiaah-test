import { InputType, Int, Field } from '@nestjs/graphql';
import { StringTranslationField } from '@products';

@InputType()
export class ProductFilterGroupValueInput {
  @Field(() => [StringTranslationField])
  name: StringTranslationField[];

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class CreateFilterInput {
  @Field(() => [StringTranslationField])
  name: StringTranslationField[];

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ProductFilterGroupValueInput])
  values: ProductFilterGroupValueInput[];
}
