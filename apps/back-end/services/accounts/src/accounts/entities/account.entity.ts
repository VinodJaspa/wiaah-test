import { ObjectType, Directive, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
// @Directive('@key(fields: "id")')
export class Account {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
