import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

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

@ObjectType()
export class NewsletterSubscriber {
  @Field(() => ID)
  id: String;

  @Field(() => ID)
  ownerId: String;

  @Field(() => NewsletterSettings)
  emailSettings: NewsletterSettings;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
