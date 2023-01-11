import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountInputData {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  password: string;
}
