import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  locale: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  sortOrder: number;
}
