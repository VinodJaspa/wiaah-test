import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostLocationInput {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  state: string;
}
