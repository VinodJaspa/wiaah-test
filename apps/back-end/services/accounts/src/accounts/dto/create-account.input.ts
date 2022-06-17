import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}
