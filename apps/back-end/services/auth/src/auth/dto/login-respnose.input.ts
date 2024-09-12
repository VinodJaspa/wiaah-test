import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => Int)
  code: number;

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean)
  success: boolean;
}
