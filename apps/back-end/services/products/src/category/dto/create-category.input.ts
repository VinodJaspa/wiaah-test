import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma-client';
import { TranslationTextInput } from '@shop';

@InputType()
export class CreateCategoryInput {
  @Field(() => ID, { nullable: true })
  parantId?: string;

  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  metaTagTitle: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  metaTagDescription: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  metaTagKeywords: TranslationTextInput[];

  @Field(() => Int)
  sortOrder: number;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;
}
