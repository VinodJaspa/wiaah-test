import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => ID, { nullable: true })
  parantId?: string;

  @Field(() => String)
  name: string;
}
