import { Field, ObjectType } from '@nestjs/graphql';
import { AffiliationPost } from './affiliation-post.entity';

@ObjectType()
export class HashtagTopAffiliationPost {
  @Field(() => AffiliationPost, { nullable: true })
  viewed?: AffiliationPost;
  @Field(() => AffiliationPost, { nullable: true })
  liked?: AffiliationPost;
  @Field(() => AffiliationPost, { nullable: true })
  shared?: AffiliationPost;
  @Field(() => AffiliationPost, { nullable: true })
  commented?: AffiliationPost;
}
