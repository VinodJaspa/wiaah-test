import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserAuthSetting {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  twoFactoryAuth: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
