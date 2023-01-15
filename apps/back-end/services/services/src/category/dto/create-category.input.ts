import { TranslationTextInput } from '@dto';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryFilterValueInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => String)
  filteringValue: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class ServiceCategoryFilterInput {
  @Field(() => [TranslationTextInput])
  filterGroupName: TranslationTextInput[];

  @Field(() => String)
  filteringKey: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValueInput])
  filterValues: ServiceCategoryFilterValueInput[];
}

@InputType()
export class CreateCategoryInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => [ServiceCategoryFilterInput])
  filters: ServiceCategoryFilterInput[];

  @Field(() => String)
  slug: string;
}
