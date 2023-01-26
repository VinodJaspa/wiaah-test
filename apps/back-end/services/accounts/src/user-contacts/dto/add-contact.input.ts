import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddContactInput {
  @Field(() => String, { nullable: true })
  gmail?: string;

  @Field(() => String, { nullable: true })
  yahoo?: string;

  @Field(() => String, { nullable: true })
  whatsapp?: string;

  @Field(() => String, { nullable: true })
  outlook?: string;
}
