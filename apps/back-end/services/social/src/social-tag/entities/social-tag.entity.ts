import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SocialTag {
  @Field(() => String)
  contentId: string;

  @Field(() => [String])
  taggedUserIds: string[];
}
