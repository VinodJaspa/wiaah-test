import { Field, ObjectType } from '@nestjs/graphql';
import { ProductPost } from './product-post.entity';

@ObjectType()
export class HashtagProductPost {
  @Field(() => ProductPost, { nullable: true })
  viewed?: ProductPost;

  @Field(() => ProductPost, { nullable: true })
  liked?: ProductPost;

  @Field(() => ProductPost, { nullable: true })
  commented?: ProductPost;

  @Field(() => ProductPost, { nullable: true })
  shared?: ProductPost;
}
