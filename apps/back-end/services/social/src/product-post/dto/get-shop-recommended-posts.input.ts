import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetShopRecommendedPostsInput {
  @Field(() => String, { nullable: true })
  q: string;
}
