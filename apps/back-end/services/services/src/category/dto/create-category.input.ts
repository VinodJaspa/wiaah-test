import { TranslationTextInput } from '@dto';
import { InputType, Int, Field } from '@nestjs/graphql';
import { ServiceType } from 'prismaClient';

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
export class CreateServiceCategoryInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => [ServiceCategoryFilterValueInput])
  filters: ServiceCategoryFilterValueInput[];

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => TranslationTextInput)
  description: TranslationTextInput;

  @Field(() => TranslationTextInput)
  metaTagDescription: TranslationTextInput;

  @Field(() => TranslationTextInput)
  metaTagTitle: TranslationTextInput;

  @Field(() => TranslationTextInput)
  metaTagKeywords: TranslationTextInput;

  @Field(() => TranslationTextInput)
  seo: TranslationTextInput;
}
