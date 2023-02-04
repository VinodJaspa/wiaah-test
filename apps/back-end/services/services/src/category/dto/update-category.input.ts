import { CreateServiceCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceCategoryInput extends PartialType(
  CreateServiceCategoryInput,
) {
  @Field(() => String)
  id: string;
}
