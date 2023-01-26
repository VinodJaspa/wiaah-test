import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserContact {
  @Field(() => String, { nullable: true })
  gmail?: string;

  @Field(() => String, { nullable: true })
  yahoo?: string;

  @Field(() => String, { nullable: true })
  whatsapp?: string;

  @Field(() => String, { nullable: true })
  outlook?: string;
}
