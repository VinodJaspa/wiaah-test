import { CreateServiceCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ServiceCategoryStatus } from 'prismaClient';

@InputType()
export class UpdateServiceCategoryInput extends PartialType(
  CreateServiceCategoryInput,
) {
  @Field(() => String)
  id: string;

  @Field(() => ServiceCategoryStatus, { nullable: true })
  status?: ServiceCategoryStatus;
}
