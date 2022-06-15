import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Registeration {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  url: string;
}
