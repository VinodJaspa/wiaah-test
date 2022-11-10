import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class NewsletterSettings {
  @Field(() => Boolean)
  feedback: boolean;

  @Field(() => Boolean)
  reminder: boolean;

  @Field(() => Boolean)
  product: boolean;

  @Field(() => Boolean)
  news: boolean;
}
