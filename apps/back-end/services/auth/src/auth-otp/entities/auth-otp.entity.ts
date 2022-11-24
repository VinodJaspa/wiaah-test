import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthOtp {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  expiresAt: Date;

  @Field(() => String)
  code: string;
}
