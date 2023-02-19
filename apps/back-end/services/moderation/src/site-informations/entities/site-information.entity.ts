import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class SiteInformation {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  descirption: string;

  @Field(() => [String])
  placements: string[];

  @Field(() => String)
  slug: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => String)
  route: string;
}
