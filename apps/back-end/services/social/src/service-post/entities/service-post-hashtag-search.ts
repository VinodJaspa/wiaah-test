import { Field, ObjectType } from '@nestjs/graphql';
import { ServicePost } from './service-post.entity';

@ObjectType()
export class ServicePostHashtagSearch {
  @Field(() => ServicePost, { nullable: true })
  viewed?: ServicePost;
  @Field(() => ServicePost, { nullable: true })
  liked?: ServicePost;
  @Field(() => ServicePost, { nullable: true })
  shared?: ServicePost;
  @Field(() => ServicePost, { nullable: true })
  commented?: ServicePost;
}
