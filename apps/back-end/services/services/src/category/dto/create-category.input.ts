import { TranslationText } from '@entities';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryFilterValueInput {
  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => String)
  filteringValue: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class ServiceCategoryFilterInput {
  @Field(() => [TranslationText])
  filterGroupName: TranslationText[];

  @Field(() => String)
  filteringKey: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValueInput])
  filterValues: ServiceCategoryFilterValueInput[];
}

@InputType()
export class CreateCategoryInput {
  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => [ServiceCategoryFilterInput])
  filters: ServiceCategoryFilterInput[];
}
