import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBeautyCenterTreatmentCategoryInput } from './create-beauty-center-treatment-category.input';

@InputType()
export class UpdateTreatmentCategoriesInput extends PartialType(
  CreateBeautyCenterTreatmentCategoryInput,
) {
  @Field(() => [ID])
  ids: string;
}
