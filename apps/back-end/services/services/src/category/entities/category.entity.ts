import { TranslationText } from '@entities';
import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ServiceCategoryStatus } from 'prismaClient';

registerEnumType(ServiceCategoryStatus, { name: 'ServiceCategoryStatus' });

@ObjectType()
export class ServiceCategoryFilterValue {
  @Field(() => String)
  name: string;

  @Field(() => String)
  filteringValue: string;

  @Field(() => Int)
  sortOrder: number;
}

@ObjectType()
export class ServiceCategoryFilter {
  @Field(() => String)
  filterGroupName: string;

  @Field(() => String)
  filteringKey: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValue])
  filterValues: ServiceCategoryFilterValue[];
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => ServiceCategoryStatus)
  status: ServiceCategoryStatus;

  @Field(() => String)
  slug: string;

  @Field(() => [ServiceCategoryFilter])
  filters: ServiceCategoryFilter[];

  @Field(() => String)
  thumbnail: string;

  @Field(() => TranslationText)
  description: TranslationText;

  @Field(() => TranslationText)
  metaTagDescription: TranslationText;

  @Field(() => TranslationText)
  metaTagTitle: TranslationText;

  @Field(() => TranslationText)
  metaTagKeywords: TranslationText;

  @Field(() => TranslationText)
  seo: TranslationText;
}
