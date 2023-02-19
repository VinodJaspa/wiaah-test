import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSiteInformationInput {
  @Field(() => String)
  description: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => String)
  route: string;
}
