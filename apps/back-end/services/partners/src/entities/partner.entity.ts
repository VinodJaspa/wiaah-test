import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Partner {
  @Field(() => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  thumbnail: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
