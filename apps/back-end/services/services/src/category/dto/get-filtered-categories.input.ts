import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetFilteredCategoriesInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  sortOrder: number;
}
