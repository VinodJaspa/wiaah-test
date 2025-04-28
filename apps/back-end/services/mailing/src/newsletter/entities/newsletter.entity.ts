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
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => NewsletterSettings)
  emailSettings: NewsletterSettings;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
