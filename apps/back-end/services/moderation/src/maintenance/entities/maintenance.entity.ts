import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Maintenance {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  from: Date;

  @Field(() => String)
  to: Date;
}
