import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class NewsletterInput {
  @Field(() => Boolean)
  feedback: boolean;

  @Field(() => Boolean)
  reminder: boolean;

  @Field(() => Boolean)
  product: boolean;

  @Field(() => Boolean)
  news: boolean;
}
