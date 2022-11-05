import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Hashtag } from './extends';

@ObjectType()
export class SearchHashtag {
  @Field(() => [ID])
  ids: string[];

  @Field(() => [Hashtag], { nullable: true })
  tags?: Hashtag[];
}
