import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTreatmentCategoriesInput {
  @Field(() => [ID])
  ids: string[];
}
