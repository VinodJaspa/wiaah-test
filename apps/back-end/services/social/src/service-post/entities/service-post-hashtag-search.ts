import { Field, ObjectType } from '@nestjs/graphql';
import { ServicePost } from './service-post.entity';

@ObjectType()
export class ServicePostHashtagSearch {
  @Field(() => ServicePost)
  viewed: ServicePost;
  @Field(() => ServicePost)
  liked: ServicePost;
  @Field(() => ServicePost)
  shared: ServicePost;
  @Field(() => ServicePost)
  commented: ServicePost;
}
