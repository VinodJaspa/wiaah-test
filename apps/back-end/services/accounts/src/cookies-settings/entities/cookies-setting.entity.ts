import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class CookiesSetting {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  required: boolean;

  @Field(() => [String])
  benefits: string[];

  @Field(() => [String])
  cons: string[];
}
