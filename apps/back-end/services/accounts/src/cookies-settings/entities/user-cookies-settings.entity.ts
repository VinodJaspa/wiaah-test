import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCookiesSettings {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [String])
  acceptedCookiesIds: string[];

  @Field(() => Boolean)
  acceptedRequired: boolean;
}
