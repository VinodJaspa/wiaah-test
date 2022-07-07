import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddPartnerInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  thumbnail: string;
}
