import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AccountInput {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  email: string;
}

@InputType()
export class CreateSellerAccountInput extends AccountInput {
  @Field(() => String)
  companyRegisterationNumber: string;
}
