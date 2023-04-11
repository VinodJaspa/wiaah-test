import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTreatmentCategoryInput {
  @Field(() => ID)
  id: string;
}
